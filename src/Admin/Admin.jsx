import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Performances des étudiants */}
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Performances des étudiants
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={[
                { name: "Jan", uv: 50 },
                { name: "Feb", uv: 70 },
                { name: "Mar", uv: 90 },
              ]}
            >
              <Line type="monotone" dataKey="uv" stroke="#4CAF50" />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cours Actifs */}
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Cours Actifs
          </h3>
          <div className="space-y-4">
            <CourseProgress
              course="Mathématiques"
              progress={70}
              link="/courses/math"
            />
            <CourseProgress
              course="Physique"
              progress={45}
              link="/courses/physics"
            />
          </div>
        </div>

        {/* Messages récents */}
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            <Link to="/messages" className="hover:text-blue-500">
              Messages récents
            </Link>
          </h3>
          <ul className="space-y-3">
            <MessagePreview
              user="Étudiant A"
              message="J’ai une question sur le devoir 3."
              link="/messages/etudiant-a"
            />
            <MessagePreview
              user="Étudiant B"
              message="Pouvez-vous revoir ma correction ?"
              link="/messages/etudiant-b"
            />
          </ul>
        </div>

        {/* <div className="flex flex-wrap gap-6 justify-between mt-6"> */}
        {/* Évaluations */}
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            <Link to="/evaluations" className="hover:text-blue-500">
              Évaluations en Cours
            </Link>
          </h3>
          <div className="space-y-4">
            <TaskStatus
              task="Examen 1"
              status="En attente"
              link="/exam/examen-1"
            />
            <TaskStatus
              task="Devoir 2"
              status="En cours"
              link="/exam/devoir-2"
            />
          </div>
        </div>

        {/* Rapports analytiques */}
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Rapports Analytiques
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={[
                { name: "Jan", value: 60 },
                { name: "Feb", value: 50 },
                { name: "Mar", value: 80 },
              ]}
            >
              <Line type="monotone" dataKey="value" stroke="#1E90FF" />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Messagerie */}
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            <Link to="/internal-messages" className="hover:text-blue-500">
              Messagerie interne
            </Link>
          </h3>
          <div className="space-y-4">
            <MessageCount count={3} link="/messages/unread" />
            <MessageCount count={8} link="/messages/all" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseProgress({ course, progress, link }) {
  return (
    <div className="flex justify-between items-center">
      <Link to={link} className="text-blue-500 hover:underline">
        {course}
      </Link>
      <div className="flex items-center space-x-2">
        <div className="w-32 bg-gray-200 h-2 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span>{progress}%</span>
      </div>
    </div>
  );
}

function MessagePreview({ user, message, link }) {
  return (
    <div className="flex items-center">
      <FaEnvelope className="text-gray-500 mr-3" />
      <div>
        <Link to={link} className="font-semibold text-blue-500 hover:underline">
          {user}
        </Link>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
}

function TaskStatus({ task, status, link }) {
  const statusColors =
    status === "En cours"
      ? "text-yellow-500"
      : status === "En attente"
      ? "text-gray-500"
      : "text-green-500";
  return (
    <div className="flex justify-between items-center">
      <Link to={link} className="text-blue-500 hover:underline">
        {task}
      </Link>
      <span className={`${statusColors} font-semibold`}>{status}</span>
    </div>
  );
}

function MessageCount({ count, link }) {
  return (
    <div className="flex justify-between items-center">
      <span>Messages non lus</span>
      <Link to={link} className="font-semibold text-blue-500 hover:underline">
        {count}
      </Link>
    </div>
  );
}
