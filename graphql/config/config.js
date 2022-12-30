import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionResult from '~/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });
export default ({req, app}) => {
    return {
      httpEndpoint: (process.env.BACKEND_URL || "https://api.phdhfk.uber.space") + "/graphql",
      cache: new InMemoryCache({ fragmentMatcher })
    }
}
