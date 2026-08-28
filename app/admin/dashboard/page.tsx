"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  Users,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import StatCard from "@/components/admin/StatCard";
import VolunteerTable from "@/components/admin/VolunteerTable";

type LgaCount = {
  lga: string;
  count: number;
};

type RecentVolunteer = {
  name: string;
  email: string;
  lga: string;
  occupation: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [volunteerCount, setVolunteerCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);

  const [lgaCounts, setLgaCounts] = useState<LgaCount[]>([]);
  const [recentVolunteers, setRecentVolunteers] = useState<
    RecentVolunteer[]
  >([]);

  const [nextEvent, setNextEvent] = useState<any | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      await loadDashboardData();

      setLoading(false);
    }

    checkSession();
  }, [router]);

  async function loadDashboardData() {
    try {
      const [
        volunteersResult,
        eventsResult,
        newsResult,
        galleryResult,
        volunteerRowsResult,
      ] = await Promise.all([
        supabase
          .from("volunteers")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("events")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("news")
          .select("*", { count: "exact", head: true })
          .eq("status", "Published"),

        supabase
          .from("gallery")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("volunteers")
          .select('"Name", "Email", "L.G.A", "Occupation"')
          .order("Name", { ascending: true }),
      ]);

      setVolunteerCount(volunteersResult.count ?? 0);
      setEventCount(eventsResult.count ?? 0);
      setNewsCount(newsResult.count ?? 0);
      setGalleryCount(galleryResult.count ?? 0);

      const { data: upcomingEvent, error: upcomingEventError } =
        await supabase
          .from("events")
          .select("*")
          .eq("status", "Published")
          .gte("date", new Date().toISOString().split("T")[0])
          .order("date", { ascending: true })
          .order("time", { ascending: true })
          .limit(1)
          .maybeSingle();

      if (upcomingEventError) {
        console.error("Upcoming Event Error:", upcomingEventError);
      } else {
        setNextEvent(upcomingEvent);
      }

      if (!volunteerRowsResult.error && volunteerRowsResult.data) {
        const rows = volunteerRowsResult.data as any[];

        const counts: Record<string, number> = {};

        rows.forEach((row) => {
          const lga = row["L.G.A"] || "Not Specified";

          counts[lga] = (counts[lga] || 0) + 1;
        });

        const sortedLgas = Object.entries(counts)
          .map(([lga, count]) => ({
            lga,
            count,
          }))
          .sort((a, b) => b.count - a.count);

        setLgaCounts(sortedLgas);

        setRecentVolunteers(
          rows.slice(0, 5).map((row) => ({
            name: row["Name"] || "Unknown",
            email: row["Email"] || "",
            lga: row["L.G.A"] || "Not Specified",
            occupation: row["Occupation"] || "Not Specified",
          }))
        );
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Campaign Command Centre
          </h1>

          <p className="mt-2 text-gray-500">
            Gajere 2027 Campaign Management System
          </p>
        </div>

        <div className="rounded-xl bg-gray-900 px-5 py-3 text-right text-white shadow-md">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Abuja Time
          </p>

          <p className="mt-1 text-2xl font-bold tabular-nums">
            {currentTime.toLocaleTimeString("en-NG", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
              timeZone: "Africa/Lagos",
            })}
          </p>

          <p className="text-xs text-gray-400">
            {currentTime.toLocaleDateString("en-NG", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Africa/Lagos",
            })}
          </p>
        </div>


        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
        >
          Logout
        </button>

      </div>


      {/* STATISTICS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Volunteers"
          value={volunteerCount}
          icon={<Users size={28} />}
        />

        <StatCard
          title="Events"
          value={eventCount}
          icon={<Calendar size={28} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Published News"
          value={newsCount}
          icon={<Newspaper size={28} />}
          color="bg-orange-500"
        />

        <StatCard
          title="Gallery Images"
          value={galleryCount}
          icon={<ImageIcon size={28} />}
          color="bg-purple-600"
        />

      </div>


      {/* CAMPAIGN PULSE */}

      <div className="rounded-2xl bg-gradient-to-r from-green-700 to-green-900 p-8 text-white shadow-lg">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-200">
              Campaign Pulse
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              The movement is gaining momentum.
            </h2>

            <p className="mt-2 max-w-2xl text-green-100">
              The campaign currently has{" "}
              <span className="font-bold text-white">
                {volunteerCount} {volunteerCount === 1 ? "registered volunteer" : "registered volunteers"}
              </span>,{" "}
              <span className="font-bold text-white">
                {eventCount} {eventCount === 1 ? "scheduled event" : "scheduled events"}
              </span>,{" "}
              <span className="font-bold text-white">
                {newsCount} {newsCount === 1 ? "published story" : "published stories"}
              </span>, and{" "}
              <span className="font-bold text-white">
                {galleryCount} {galleryCount === 1 ? "gallery image" : "gallery images"}
              </span>.
            </p>
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 text-3xl">
            🚀
          </div>

        </div>

      </div>

      {/* NEXT CAMPAIGN EVENT */}

      <div className="rounded-2xl bg-white p-8 shadow-md">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Next Campaign Event
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {nextEvent
                ? nextEvent.title
                : "No upcoming event"}
            </h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <Calendar size={24} />
          </div>

        </div>

        {nextEvent ? (
          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3 text-gray-700">
              <Calendar size={18} />
              <span>
                {new Date(
                  `${nextEvent.date}T${nextEvent.time || "00:00:00"}`
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Clock size={18} />
              <span>
                {nextEvent.time || "Time not specified"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MapPin size={18} />
              <span>
                {nextEvent.location || "Location not specified"}
              </span>
            </div>

            <div className="pt-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {nextEvent.category || "Campaign"}
              </span>
            </div>

          </div>
        ) : (
          <p className="mt-6 text-gray-500">
            There are no upcoming published events at the moment.
          </p>
        )}

      </div>

      {/* CAMPAIGN OVERVIEW */}

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Volunteer Reach
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Volunteer distribution across LGAs
              </p>

            </div>

            <MapPin className="text-green-700" size={28} />

          </div>


          <div className="mt-6 space-y-4">

            {lgaCounts.length === 0 && (
              <p className="text-gray-500">
                No volunteer data available yet.
              </p>
            )}

            {lgaCounts.map((item) => {

              const percentage =
                volunteerCount > 0
                  ? (item.count / volunteerCount) * 100
                  : 0;

              return (
                <div key={item.lga}>

                  <div className="mb-1 flex justify-between text-sm">

                    <span className="font-medium text-gray-700">
                      {item.lga}
                    </span>

                    <span className="font-semibold text-green-700">
                      {item.count}
                    </span>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">

                    <div
                      className="h-full rounded-full bg-green-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>


        {/* ELECTION COUNTDOWN */}

        <div className="rounded-2xl bg-green-700 p-6 text-white shadow-md">

          <Clock size={32} />

          <h2 className="mt-6 text-2xl font-bold">
            Election 2027
          </h2>

          <p className="mt-2 text-green-100">
            Building momentum across Kebbi South.
          </p>

          <div className="mt-8">

            <p className="text-sm text-green-200">
              Campaign Status
            </p>

            <p className="mt-1 text-3xl font-bold">
              ACTIVE
            </p>

          </div>

        </div>

      </div>


      {/* RECENT VOLUNTEERS */}

      <div className="rounded-2xl bg-white p-6 shadow-md">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Recent Volunteers
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Latest people joining the movement
            </p>

          </div>

          <ArrowUpRight className="text-green-700" size={26} />

        </div>


        <div className="mt-6 overflow-x-auto">

          {recentVolunteers.length === 0 ? (

            <p className="py-6 text-gray-500">
              No volunteers registered yet.
            </p>

          ) : (

            <table className="w-full text-left">

              <thead>

                <tr className="border-b text-sm text-gray-500">

                  <th className="pb-3">
                    Name
                  </th>

                  <th className="pb-3">
                    Email
                  </th>

                  <th className="pb-3">
                    LGA
                  </th>

                  <th className="pb-3">
                    Occupation
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentVolunteers.map((volunteer, index) => (

                  <tr
                    key={`${volunteer.email}-${index}`}
                    className="border-b last:border-0"
                  >

                    <td className="py-4 font-semibold text-gray-900">
                      {volunteer.name}
                    </td>

                    <td className="py-4 text-gray-600">
                      {volunteer.email}
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {volunteer.lga}
                      </span>
                    </td>

                    <td className="py-4 text-gray-600">
                      {volunteer.occupation}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>


      {/* EXISTING VOLUNTEER TABLE */}

      <div>

        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Volunteer Management
        </h2>

        <VolunteerTable />

      </div>



    </div>
  );
}















