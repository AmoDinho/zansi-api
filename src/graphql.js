const {ApolloServer, gql} = require("apollo-server-lambda");

const typeDefs = gql`
    type Query {
      hello: String
    }
 `;

const resolvers = {
	Query: {
		hello: () => "Zansi is now live!🎈 Zansi is a Pimp My Book ordering service for university textbooks 📚"
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	formatError: error => {
		console.log(error);
		return error;
	},
	formatResponse: response => {
		console.log(response);
		return response;
	},
	context: ({event,context}) => ({
		headers: event.headers,
		functionName: context.functionName,
		event,
		context,
	}),
	tracing: true,
	playground: true
});

exports.graphqlHandler = (event,context,callback) =>{
	const handler = server.createHandler({
		cors: {
			origin: "*",
			credentials:true,
			methods: [
				"POST",
				"GET"
			], 
			allowedHeaders: [
				"Content-Type",
				"Origin",
				"Accept"
			]
		},
	}) ;

	return handler(event, context,callback);
};

