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
Search for a user on a service, e.g. `malgorithms@twitter`, or by Keybase.io name `chris`:  
https://signed-blogs.ojford.com

Go directly to a known user for a list of blog posts:  
https://signed-blogs.ojford.com/chris  
https://signed-blogs.ojford.com/malgorithms@twitter

Or straight to a plaintext (`.txt`) or markdown (`.md`) article:  
http://signed-blogs.ojford.com/chris/plan.txt  

Finally, force markdown rendering on a `.txt`:  
http://signed-blogs.ojford.com/malgorithms@twitter/plan.txt?forceMD=true

## FAQ
### It's ugly!
Yes.
