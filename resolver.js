export const resolvers = {
    Query: {

        country: (parent, args, {
            models
        }) => {
            return Movie.findById(args.id);
        }
    }
}