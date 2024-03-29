import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { client } from "~/utils/PrismicClient";
import * as prismic from "@prismicio/client";

import { useCatch } from "@remix-run/react";
import Author from "~/components/view/Author";
  
 import type { MetaFunction } from "@remix-run/cloudflare"; // or cloudflare/deno 
 import type { LinksFunction } from "@remix-run/cloudflare"; // or cloudflare/deno 
  
 export const links: LinksFunction = () => { 
   return [] 
 } 
  
 export const meta: MetaFunction = () => { 
   return { 
      
   }; 
 }; 
  
 export const loader = async({ params }) => { 
   const postData = await client.getByUID('author', params.authorId); 
   if(!postData || !Object.keys('author').length) { 
     throw new Response("", { status: 404 }); 
   } 
   return json({ postData }); 
 } 
  
 export default function Author() {
   const { authorData } = useLoaderData<typeof loader>();
   return (
     <Author data={ authorData }>
     </Author>
   )
 } 
  
 export function CatchBoundary() { 
   const caught = useCatch<ThrownResponses>(); 
    
   switch (caught.status) { 
     case 401:  
       return (
         <>
         </>
       ); 
     case 404: 
       return (
         <>
         </>
       ); 
   } 
    
   return ( 
     <div> 
       Something went wrong: {caught.status}{" "} 
       {caught.statusText} 
     </div> 
   ); 
 } 
  
 export function ErrorBoundary({ error }) { 
   return ( 
     <div> 
       <h1>Error</h1> 
       <p>{error.message}</p> 
       <p>The stack trace is:</p> 
       <pre>{error.stack}</pre> 
     </div> 
   ); 
 }
