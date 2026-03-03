# quality Spec Delta

## ADDED Capability: quality

### Requirement: Automated Testing

System shall have automated unit tests for core calculations and validation.

#### Scenario: Formula tests run successfully
- GIVEN Jest is installed and configured
- WHEN developer runs `npm test`
- THEN all formula tests pass
- AND coverage report is generated

#### Scenario: Validation tests run successfully
- GIVEN Jest is installed and configured
- WHEN developer runs `npm test`
- THEN all validation tests pass
- AND coverage report is generated

### Requirement: Continuous Integration

System shall run tests automatically on code changes.

#### Scenario: Tests run on push
- GIVEN code is pushed to master/main branch
- WHEN GitHub Actions workflow triggers
- THEN tests run automatically
- AND results are visible in GitHub

#### Scenario: Tests run on pull request
- GIVEN a pull request is created
- WHEN GitHub Actions workflow triggers
- THEN tests run automatically
- AND PR shows test status

## ADDED Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Unit Tests | 30+ | 39 ✅ |
| Test Coverage | 80% | 29% |
| CI Pipeline | Yes | Yes ✅ |
| Test Suites | 2+ | 2 ✅ |