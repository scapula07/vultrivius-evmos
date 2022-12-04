import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout/layout";
import Item from "./pages/Item";
import CreateNft from "./pages/CreateNft";
import Staking from "./pages/StakingPool";
import CreateStake from "./pages/CreateStake";
import Profile from "./pages/Profile";
import Created from "./pages/Profile/created";
import UserCollections from "./pages/Profile/collections";
import Transactions from "./pages/Profile/transactions";
import Owned from "./pages/Profile/owned";
import Goverance from "./pages/Goverance";

import Rapture from "./pages/Rapture";

import Wallet from "./pages/Profile/wallet";
import Bridge from "./pages/BridgePage";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="App">
        <Toaster />
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/item/:name" element={<Item />} />
            <Route exact path="/rapture" element={<Rapture />} />
            <Route exact path="/list" element={<CreateNft />} />
            <Route exact path="/stake" element={<Staking />} />
            <Route exact path="/pool" element={<CreateStake />} />
            <Route exact path="/votes" element={<Goverance />} />
            <Route exact path="/profile" element={<Profile />}>
              <Route exact path="created" element={<Created />} />
              <Route exact path="collections" element={<UserCollections />} />
              <Route exact path="transactions" element={<Transactions />} />
              <Route exact path="owned" element={<Owned />} />
              <Route exact path="wallet" element={<Wallet />} />
            </Route>
            <Route exact path="/bridge" element={<Bridge />} />
            <Route exact path="/governace" element={<Goverance />} />
          </Routes>

        </Layout>
      </div>
    </QueryClientProvider>

  );
}

export default App;
