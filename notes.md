# Notes

## Future Considerations

Consider moving logic outside of supabase functions. To do that:

1. Test that a supabase client connection is only initialized once per request to the API.
2. Stress test both solutions
