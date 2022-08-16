import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Redirect from "./components/Redirect";

const client = new ApolloClient({
  uri: 'https://shrtnlnk.herokuapp.com/graphql',
  cache: new InMemoryCache()
})

function App() {
  
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:urlCode' element={<Redirect />} />
        </Routes>
      </Router>
    </ApolloProvider>
   
  );
}

export default App;
