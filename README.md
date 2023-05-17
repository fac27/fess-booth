# fess-booth
This website allows you to enter a name and a message for other to read. Although you enter a name, the name will remain anonymous to other users - to replicate the experience of a confessional booth.

Our first project as part of FAC's full time program was to create a microblogging side Our goal was to allow users to submit their own posts and view all the posts submitted by others.

**Roles**

Zack - Facilitator

Tom - UX

Mark - DevOps

Cameo - Testing

User Stories:

 As an opinionated person, I want to: post my thoughts so others can read them
 As a bored person, I want to: read what other people have posted
 As an impulsive person, I want to: delete my posts so no one can see them anymore

## Installation

``` terminal 
git clone "https://github.com/fac27/fess-booth"
```
``` terminal 
npm install
```

You can either access this site by going to: https://fess-booth-3.fly.dev/

Or after you clone the repo you can:

``` terminal 
npm run dev
```
## Testing
We create 2 tests:

1. test the sanization of the messages posted
2. test the validation of the entering the name and the message

to run the tests enter the following in the terminal:

```terminal 
node --test
```
#### Things that work

#### Things that don't work
