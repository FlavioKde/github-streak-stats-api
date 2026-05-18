# Changelog

All notable changes in this project will be documented in this file

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
### Changed 

### Fixed
- Documentation clarified regarding GitHub token requirement

### Removed

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

[Unreleased]: https://github.com/FlavioKde/github-streak-stats-api/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/FlavioKde/github-streak-stats-api/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/FlavioKde/github-streak-stats-api/releases/tag/v1.0.0


---