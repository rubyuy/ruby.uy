---
name: rspec-tests-for-rails
description: Reglas para escribir tests RSpec rápidos y mantenibles en proyectos Rails - build_stubbed sobre build/create, let sobre before, minimizar create_list, evitar N+1 en specs, memoizar el subject. Usar cuando el usuario pida escribir, revisar o refactorizar specs de RSpec en un proyecto Rails.
---

# Rules to create RSpec tests

1. Prefer `let` instead of `before` blocks where possible.

2. Prefer `build_stubbed` over `build` for memory-only objects — `build` is not as innocuous as it seems; if the object has associations, FactoryBot will call `create` on them, touching the DB anyway.

- Use `build_stubbed`: creates an object with ID, timestamps and associations (also stubbed) without touching the DB. It's the fastest option.
- Use `build`: only if you need to pass database validations or if you plan to call `.save` manually in the test.

```ruby
# Bad - build may still hit DB for associations
let(:user) { build(:user) }

# Good - completely in-memory, no DB touches
let(:user) { build_stubbed(:user) }
```

3. Do not mock or stub a method call when you can set up the test to use real data instead.

4. When you do need a double, use a verifying double — a plain `double` or a bare `allow(...).to receive(...)` never checks that the method exists, so the spec stays green after the real method is renamed or its signature changes. `instance_double` and `class_double` validate against the real class.

```ruby
# Bad - passes even if PaymentGateway#charge! no longer exists
let(:gateway) { double(charge!: true) }

# Good - fails if the method or its arity changes
let(:gateway) { instance_double(PaymentGateway, charge!: true) }
```

Avoid `allow_any_instance_of` entirely: it stubs a method on every instance, hides which object is under test, and is not verified.

5. Use `let` to reduce duplication in tests. If a value is only used by a single example, a plain local variable inside the `it` is clearer than a `let` far away from its usage.

6. When writing a series of tests that share the same execution in the expect statement, set the `subject` at the beginning of the test block and use it across the tests.

7. Use "shorthand hashes" / syntactic sugar for hashes to avoid redundancy.

8. Test all the public methods in each class.

9. Test private methods only indirectly, through the public methods of the same class.

10. Use the minimum count in `create_list` — centralizing is good, but volume kills performance.

```ruby
# Bad - creates 10 records just to test that a scope returns results
create_list(:user, 10)

# Good - if the test passes with 2, you probably don't need 10
create_list(:user, 2)
```

**Pro tip**: if you need to test pagination, stub the `per_page` value instead of creating 50 records.

11. Use `build_stubbed` for "leaf" associations — when you create an object with `create`, but its associations don't need to be in the database for the logic under test, stub the association inside the `create`.

```ruby
# Bad - creates both in DB
let(:profile) { create(:profile, user: create(:user)) }

# Good - creates profile in DB, but user is just a stubbed memory object
let(:profile) { create(:profile, user: build_stubbed(:user)) }
```

Useful when the main model requires a valid `user_id` for validations, but you won't run queries that JOIN against the users table.

12. Preload nested associations to avoid N+1 in specs — sometimes the test is slow not because of creation, but because of execution. Reading a column off an already-loaded association is free; walking into a *nested* association inside a loop is what triggers one query per record.

```ruby
# Bad - one extra query per child to fetch its author
let(:parent) { create(:parent) }
before { create_list(:child, 10, parent: parent) }

it "lists the authors" do
  expect(parent.children.map { |child| child.author.name }).to all(be_present)
end

# Good - preload the nested association and use the preloaded relation
it "lists the authors" do
  children = parent.children.includes(:author)

  expect(children.map { |child| child.author.name }).to all(be_present)
end
```

Note that `parent.children.reload.includes(:author)` does **not** work: `reload` returns the already-loaded collection and the relation built by `includes` is discarded. You have to use the relation that `includes` returns.

13. Use "transient attributes" in factories — instead of creating extra records in a `let` just so the main object has a specific state, use transient attributes in the factory to handle complex creation logic without cluttering the spec.

```ruby
# Factory definition
factory :invoice do
  transient do
    item_count { 3 }
  end

  after(:create) do |invoice, evaluator|
    create_list(:item, evaluator.item_count, invoice: invoice)
  end
end

# Spec - clear and fast
let(:invoice) { create(:invoice, item_count: 1) } # Default was 3, we optimized to 1
```

14. Memoize expensive subjects and use `described_class` — make sure the subject is not recalculated on every call. For services that mutate state, call the subject once in a `before` block, or use `let!` if the side effect is required for expectations.

```ruby
# Bad - subject recalculates on each call
subject { described_class.new(params).call }

it "creates a record" do
  expect { subject }.to change(User, :count).by(1)
end

it "returns success" do
  expect(subject).to be_success # This calls the service AGAIN!
end

# Good - call once, test the result
subject(:result) { described_class.new(params).call }

before { result } # Execute once

it "creates a record" do
  expect(User.count).to eq(1)
end

it "returns success" do
  expect(result).to be_success
end

# Alternative with let! for side effects
let!(:result) { described_class.new(params).call }

it "creates a record" do
  expect(User.count).to eq(1)
end
```

15. Group related expectations with `aggregate_failures` instead of splitting them into many one-line examples — every example re-runs the whole `let` / `before` setup, so five examples over the same expensive subject pay that cost five times. `aggregate_failures` reports every failure in the block instead of stopping at the first one, so you keep the diagnostics without the extra setup.

```ruby
# Bad - the service runs once per example
it { expect(result).to be_success }
it { expect(result.user).to be_persisted }
it { expect(result.errors).to be_empty }

# Good - one setup, and a failure in the first line still reports the rest
it "returns a successful result" do
  aggregate_failures do
    expect(result).to be_success
    expect(result.user).to be_persisted
    expect(result.errors).to be_empty
  end
end
```

16. Freeze the clock in anything time-sensitive — a spec that reads the real clock more than once can straddle a second, a day or a month boundary and fail intermittently, usually in CI and never on your machine.

```ruby
# Bad - the two reads of the clock can land in different seconds
it "does not expire before 24 hours" do
  token = create(:token, created_at: 24.hours.ago + 1.second)

  expect(token).not_to be_expired # flaky: if a second elapses, it IS expired
end

# Good - one fixed instant for the whole example
it "does not expire before 24 hours" do
  freeze_time do
    token = create(:token, created_at: 24.hours.ago + 1.second)

    expect(token).not_to be_expired
  end
end
```

Use `travel_to(Date.new(2026, 2, 29))` when the logic depends on the calendar itself — end of month, leap years, DST switches.

17. Never let a spec make a real HTTP call. Stub every outbound request with WebMock (or record it with VCR): a live call ties your suite to the network, to a third party's uptime and to data you don't control.

```ruby
# Bad - real network call: breaks with no internet, or when the API is slow or down
it "fetches the exchange rate" do
  expect(ExchangeRateService.call).to eq(40.5)
end

# Good - deterministic stubbed response
it "fetches the exchange rate" do
  stub_request(:get, "https://api.exchangerate.com/v1")
    .to_return(status: 200, body: { rate: 40.5 }.to_json)

  expect(ExchangeRateService.call).to eq(40.5)
end

# The real payoff: the failure paths you could never trigger against the live API
it "falls back when the provider times out" do
  stub_request(:get, "https://api.exchangerate.com/v1").to_timeout

  expect(ExchangeRateService.call).to eq(ExchangeRateService::FALLBACK)
end
```

18. Don't lean on `first` / `last` to mean "the oldest" or "the newest". With no explicit `order`, Rails falls back to primary-key order, which is only a proxy for insertion order — a backfill, an import or a data migration breaks that assumption silently.

```ruby
# Bad - `last` orders by id desc, so an imported invoice with a higher id
# silently becomes "the latest one"
expect(user.invoices.last).to eq(latest_invoice)

# Good - order by the column that carries the business meaning
expect(user.invoices.order(:issued_at).last).to eq(latest_invoice)
```

If the model already exposes a `scope :latest`, assert through the scope instead of rebuilding the ordering in the spec.

19. Pin both ends of a `change` matcher. A bare `change` already fails when nothing changes, so that is not the risk — the risk is that it stays green when the value changes to the *wrong* thing.

```ruby
# Bad - a bug setting "failed" instead of "completed" still turns this green
expect { process_payment }.to change(order, :status)

# Good - pins the exact transition
expect { process_payment }.to change(order, :status).from("pending").to("completed")
```

20. Split background work across two specs instead of running jobs inline. In the caller's spec assert only that the job was enqueued with the right arguments; test what the job actually does in the job's own spec, with `perform_now`.

```ruby
# Caller spec - assert it was enqueued, never run the job inline
it "enqueues photo processing" do
  expect { service.call }
    .to have_enqueued_job(PhotoProcessingJob).with(photo.id)
end

# Job spec - here you DO test the work
RSpec.describe PhotoProcessingJob do
  it "marks the photo as processed" do
    described_class.perform_now(photo.id)

    expect(photo.reload).to be_processed
  end
end
```

21. Keep `if`, `unless`, `case` and loops out of your examples. Beyond the readability cost, a conditional lets an example pass having asserted nothing at all — the worst kind of green.

```ruby
# Bad - if no user is active, this example passes without running a single expectation
it "notifies active users" do
  users.each do |user|
    expect(Notifier.call(user)).to be_success if user.active?
  end
end

# Good - one context per scenario, with explicit setup in each
context "when the user is active" do
  let(:user) { build_stubbed(:user, :active) }

  it "notifies the user" do
    expect(Notifier.call(user)).to be_success
  end
end

context "when the user is inactive" do
  let(:user) { build_stubbed(:user, :inactive) }

  it "does not notify the user" do
    expect(Notifier.call(user)).to be_a_failure
  end
end
```

22. Each test seeds `srand` with the current (configurable) RSpec seed. This means `Array#shuffle`, `Array#sample` and `rand` are all repeatable if you provide the original seed, with the caveat that it must run during a test run (e.g. inside a `let`, `let!` or `it`).

```bash
$ rspec
...
Randomized with seed 17999
...
$ rspec --seed 17999     # rerun with the same seed
```

23. Add an explicit `require "rails_helper"` to the test file if it needs Rails.
