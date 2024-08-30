import { liteClient as algoliasearch } from "algoliasearch/lite";
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from "@/lib/constants";

// const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID as string;
// const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY as string;

export const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
