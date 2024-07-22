# Notes

## Known issues

1. loadPuzzle function runs twice

   Right now the loadPuzzle function uses $fetch. We did that because there were issues with supabaseServer and the auth token
   that is set through Google. The result of this is that (probably) the server sends an http request to himself.
