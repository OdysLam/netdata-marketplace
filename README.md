# Netdata Marketplace

The Netdata Marketplace is a simple interface for people to discover community-curated collectors and alerts.

**Current status:** MVP

## Implementation

The marketplace is implemented with [Gatsby](https://www.gatsbyjs.com/).

A simple script (scripts/populate.js) aggregates community collectors and alerts from the Netdata Community [repository](https://github.com/netdata/community). It transforms them into `markdown` pages that live in  `content/posts`.

The Gatsby website is automatically built and deployed using Cloudflare pages.


This script will be run by a GitHub Action on regular intervals, populating the repository with new  collectors and alert, as they are added to the community repository.

Cloudflare pages will automatically rebuild the Gatsby website with every new PR to the `main` branch.
## Contributingi

You will need Gatsby.

Anything  under `/content`  is automatically added by the `populate.js` script. If you want to change that content, find the original files in the `netdata/community` repository.

To test the Gatsby website after your change, run `gatsby develop`.

If you encounter an error with `.cache`, you will need to first run `gatsby clean`.

Gatsby can auto-reload some files, enabling you to automatically see any change. Some changes will require to stop `gatsby develop` and run it again. The terminal will let you know which is the case.

**Disclaimer**:

All changes should be against the `dev` branch. After a couple of `dev` changes, we will make a PR back to `main`. This will ensure that the production website always runs with the minimum number of bugs.


