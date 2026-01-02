import React from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import CompetitionCard from './components/CompetitionCard'
import Competitions from './pages/Competitions'
import Leaderboard from './pages/Leaderboard'
import Register from './pages/Register'
import CodeEditor from './components/CodeEditor'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SolveProblem from "./pages/SolveProblem";
import JoinCompetition from './pages/JoinCompetition'
import OrganizerDashboard from './pages/OrganizerDashboard'
import CreateCompetition from './pages/CreateCompetition'
import AddProblem from './pages/AddProblem'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/join"
          element={<JoinCompetition/>}
        />

        <Route
          path="/organizer"
          element={<OrganizerDashboard/>}
        />

        <Route
          path="/organizer/create"
          element={<CreateCompetition/>}
        />

        <Route
          path="/organizer/competitions/:competitionId/add-problem"
          element={<AddProblem/>}
        />

        <Route
          path="/problems/:problemId"
          element={<SolveProblem />}
        />

        <Route
          path="/competitions"
          element={<Competitions />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

