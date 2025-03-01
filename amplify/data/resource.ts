import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
  
  BlogPostLike: a
    .model({
      // Use id as the primary key (this will be the postId)
      id: a.string().required(),
      count: a.integer().required(),
      // Add a timestamp for debugging
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      // Allow anyone to read the like count
      allow.guest().to(['read']),
      // Allow API key operations for all operations
      allow.publicApiKey().to(['create', 'read', 'update', 'delete']),
    ]),
    
  ProjectIndicator: a
    .model({
      // Use id as the primary key (this will be the projectId + indicatorType)
      id: a.string().required(),
      count: a.integer().required(),
      indicatorType: a.string().required(), // 'clever', 'launch', 'inspired'
      projectId: a.string().required(),
      // Add a timestamp for debugging
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      // Allow anyone to read the indicator count
      allow.guest().to(['read']),
      // Allow API key operations for all operations
      allow.publicApiKey().to(['create', 'read', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // Configure API key as the default authorization mode
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 365 // Long-lived API key for likes
    }
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
