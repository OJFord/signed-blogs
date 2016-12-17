Signed Blogs
============

This is a basic proof of concept cobbled together after reading about [the awesome new Keybase filesystem](https://keybase.io/introducing-the-keybase-filesystem).

It's a simple user search, and view onto plaintext and markdown formatted files stored publicly on Keybase.

## What/Why/How
There's very little to this - all the heavy-lifting is done by genii at [Keybase.io](http://keybase.io); to whom I'm not affiliated.

I just thought this was maybe an interesting use for their new filesystem, and threw this together stylesheet-less to toy with it.

Feel free to fork/PR/host your own, whatever.

Files are pulled in from Keybase every time - no storage here (would sort of defeat the point anyway).

## Try it out:
The Terraform's all ready to go, just supply AWS keys and it'll provision a Lambda, and API Gateway routing.

Then you can test it out with `${STAGE_URL}/${KEYBASE_USER}[/${POST_TITLE}`.
