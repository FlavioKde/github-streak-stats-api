# Changelog

All notable changes in this project will be documented in this file

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

### Changed 

### Fixed

### Removed

## [1.3.0] - 2026-08-09

### Added
- GitHub Languages Stats module
- Languages SVG endpoint
- Languages JSON endpoint
- Language statistics calculation including total languages, total bytes,language size, percentage, and language colors
- Dedicated languages caching system
- Unit and integration tests for Languages Stats
- Error handling and SVG error rendering for Languages endpoints
- Languages module documentation and API examples
- Modular architecture support for additional GitHub statistics

### Changed
- Expanded the project from a GitHub Streak Stats API into a modular GitHub Statistics API
- Updated README with Languages Stats documentation and usage examples
- Updated architecture documentation to include the Languages module
- Updated deployment documentation to describe the complete API deployment
- Improved separation between GitHub statistics modules and shared infrastructure

### Fixed
- Documentation clarified regarding GitHub token requirement
- Improved error handling and test coverage for SVG endpoints

### Removed

## [1.2.2] - 2026-06-12

### Added
- GitHub UI polish (badges alignment, topics configuration)
- Final README improvements

### Fixed
- Badge rendering alignment issues in README

## [1.2.1] - 2026-06-01

### Added
- Automated GitHub Release creation from semantic version tags
- CHANGELOG-driven release notes generation

### Changed
- Documented release automation workflow in architecture.md

## [1.2.0] - 2026-05-26

### Added
- CI - Automated tests in push/PR
- Dependabot - Weekly npm updates
- Releases - Manual semantic versioning
- CodeQL - Static analysis for security vulnerabilities
- Pull request template - Enforce consistent and descriptive pull requests
- Issue templates - Standardize bug reports and feature requests

## [1.1.0] - 2026-05-18

### Added
- Architecture i18n language translation module
- Default and fallback language set to English
- Unit and integration test for SVG/JSON
- Pure Json endpoint (Api-only)
- Clear separation of SVG and JSON responsibilities
- Reviewed responsibilities, architecture boundaries, and consumer interactions

## [1.0.0] - 2026-04-10

### Added
- Initial release of the self-hosted GitHub streak stats API
- Serverless API endpoint for SVG generation
- GitHub GraphQL integration
- Streak calculation engine
- SVG rendering system
- Theme support
- Multi-layer caching system (CDN + internal cache)
- Error handling with SVG responses
- One-click deployment with Vercel
- Unit and integration testing with Vitest

### Notes
- This project was originally inspired by GitHub Readme Streak Stats
- Rebuilt with a clean architecture and serverless-first approach


## Version Links

[Unreleased]:https://github.com/FlavioKde/github-streak-stats-api/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/FlavioKde/github-streak-stats-api/compare/v1.2.2...1.3.0
[1.2.2]: https://github.com/FlavioKde/github-streak-stats-api/compare/v1.2.1...1.2.2
[1.2.1]: https://github.com/FlavioKde/github-streak-stats-api/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/FlavioKde/github-streak-stats-api/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/FlavioKde/github-streak-stats-api/releases/tag/v1.1.0 
[1.0.0]: https://github.com/FlavioKde/github-streak-stats-api/releases/tag/v1.0.0


---