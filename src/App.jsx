import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Filter, Search, UserCheck, Users, UserX } from "lucide-react";

const groups = [
  {
    name: "A1",
    displayName: "NEY-A1",
    signedUp: ["Chloe Ang", "Crystal Lim", "Abby Wong", "Kirsten Low", "Chloe Chong", "Kua Ling Xian", "Ruth Loke", "Lim Yan Lin", "Avarielle", "Mai", "Elysia", "Hazel", "Arissa", "Janessa", "Alayna", "Minh Vy", "Jenna Lim"],
    notSignedUp: ["Alyssa Ong", "Athena"],
  },
  {
    name: "A2",
    displayName: "NEY-A2",
    signedUp: ["Phoebe Soh", "Gideon Chia", "Megan Lim", "Deborah Soh", "Kerin Liau", "Sophie Goh", "Erica", "Ariel"],
    notSignedUp: ["Ng Zo Ee", "Aidan Koh", "Samuel Choo", "Cheryl Ker", "Liz", "Aerin", "Zan", "Raine", "Jenny", "Sze Wing", "Hannah", "Chloe", "Aceson", "Nathaniel"],
  },
  {
    name: "A3",
    displayName: "NEY-A3",
    signedUp: ["Zoey Goh", "Hannah", "Claudia", "Haydes", "Corrinne", "Jessie Loo"],
    notSignedUp: [],
  },
  {
    name: "A4",
    displayName: "NEY-A4",
    signedUp: ["Tricia", "Belicia", "Abel", "Oliver", "Isaiah Han", "Javen Tan Kai Zhe", "Joy Tey", "Elisha Yeoh", "Zachariah", "Luk Au"],
    notSignedUp: ["Verelyn Loh"],
  },
  {
    name: "A5",
    displayName: "NEY-A5",
    signedUp: ["Joshlyn", "Stacie", "Jeroi", "Ethan Tey", "Leyanne Poy", "Trisha", "Olivia Ng", "Phoebe See", "Azryel Liew", "David Yap Jing Cheng", "Jyan Chen", "Joses Yeoh", "Claudia", "Irayna Yao"],
    notSignedUp: ["David Tan", "Kazelyn"],
  },
  {
    name: "A6",
    displayName: "NEY-A6",
    signedUp: ["Eileen", "Theodric", "Kevan", "Titus", "Joshua", "Benji", "Dave Chow", "Adam Lau", "Benjamin Ong", "Tong Rong"],
    notSignedUp: ["Isaiah", "Kayden", "Jonathan", "Brayden", "Asher Ong"],
  },
  {
    name: "B1",
    displayName: "NEY-B1",
    signedUp: ["Emily", "Melissa", "cheesiong", "Adalric", "Ethan Thiang", "Shao Zhe", "Matthew", "christine", "Lleon", "Samuel", "Jiahwee", "Brenda"],
    notSignedUp: ["carsen", "Calyn", "Felicia"],
  },
  {
    name: "B2",
    displayName: "NEY-B2",
    signedUp: ["Christopher", "Zhengyang", "Jun Han", "Esther", "xiaotong", "Melody", "Cyrus", "Shannen", "Jennifer", "David"],
    notSignedUp: ["Samuel", "daeheok"],
  },
  {
    name: "B3",
    displayName: "NEY-B3",
    signedUp: ["Kayden", "Hock Long", "Xavier", "peter", "michael", "Peiqi", "En Ming", "Jia Yu"],
    notSignedUp: ["jia hui", "davien", "Jayden"],
  },
  {
    name: "C1",
    displayName: "NEY-C1",
    signedUp: ["Josh", "Shen", "Avril", "Julian", "Nicolette", "Gladys", "Teck Yew", "Bo Ee", "Cheryl", "Kai Chuin", "Jing Yong", "Arianne Lin"],
    notSignedUp: [],
  },
  {
    name: "C2",
    displayName: "NEY-C2",
    signedUp: ["Tristan", "Vincent", "Elton", "Keith", "Gavril"],
    notSignedUp: ["Jonathan"],
  },
  {
    name: "C3",
    displayName: "NEY-C3",
    signedUp: ["Samantha Tan", "Trina", "Ernest", "Alyssa", "Zining", "Timothy", "Dingyuan", "Shufen"],
    notSignedUp: ["Yeesin"],
  },
  {
    name: "ULs",
    displayName: "NEY-ULs",
    signedUp: ["Tan Wei Xuan", "Ryan Lim", "Keefe Lau"],
    notSignedUp: [],
  },
].map((group) => {
  const total = group.signedUp.length + group.notSignedUp.length;
  return {
    ...group,
    total,
    rate: total ? Math.round((group.signedUp.length / total) * 100) : 0,
    cluster: group.name.startsWith("A") ? "A" : group.name.startsWith("B") ? "B" : group.name.startsWith("C") ? "C" : "ULs",
  };
});

const ticketFollowUps = {
  "Jessie Loo": "North Youth to Northeast Youth",
  Oliver: "North Youth to Northeast Youth",
  "Dave Chow": "Northeast Adults to Northeast Youth",
};

const clusters = ["All", "A", "B", "C", "ULs"];
const VERIFIED_SIGNUPS = groups.reduce((sum, group) => sum + group.signedUp.length, 0);
const TOTAL_MEMBERS = groups.reduce((sum, group) => sum + group.total, 0);
const OVERALL_RATE = Math.round((VERIFIED_SIGNUPS / TOTAL_MEMBERS) * 100);

function getStatus(rate) {
  if (rate === 100) return { label: "Complete", className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" };
  if (rate >= 75) return { label: "Strong", className: "border-sky-400/30 bg-sky-400/10 text-sky-200" };
  if (rate >= 50) return { label: "Follow up", className: "border-amber-400/30 bg-amber-400/10 text-amber-200" };
  return { label: "Needs push", className: "border-rose-400/30 bg-rose-400/10 text-rose-200" };
}

function StatCard({ title, value, subtitle, icon: Icon, accent = "blue" }) {
  const accentClasses = {
    blue: "from-blue-500/20 to-cyan-400/5",
    green: "from-emerald-500/20 to-lime-400/5",
    rose: "from-rose-500/20 to-orange-400/5",
    violet: "from-violet-500/20 to-fuchsia-400/5",
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-black/20 backdrop-blur">
      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-br ${accentClasses[accent]} opacity-80`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function Pill({ children, variant = "signed", note }) {
  const cls =
    variant === "ticket"
      ? "border-amber-300/20 bg-amber-400/10 text-amber-100"
      : variant === "missing"
      ? "border-rose-300/20 bg-rose-400/10 text-rose-100"
      : "border-emerald-300/20 bg-emerald-400/10 text-emerald-100";

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${cls}`} title={note || undefined}>
      <span>{children}</span>
      {note ? <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-current/90">ticket change</span> : null}
    </span>
  );
}

export default function Dashboard() {
  const [cluster, setCluster] = useState("All");
  const [query, setQuery] = useState("");
  const [followUpOnly, setFollowUpOnly] = useState(false);

  const filtered = useMemo(() => {
    return groups.filter((group) => {
      const byCluster = cluster === "All" || group.cluster === cluster;
      const haystack = `${group.displayName} ${group.signedUp.join(" ")} ${group.notSignedUp.join(" ")}`.toLowerCase();
      const byQuery = !query.trim() || haystack.includes(query.toLowerCase());
      const byFollowUp = !followUpOnly || group.notSignedUp.length > 0 || group.signedUp.some((name) => ticketFollowUps[name]);
      return byCluster && byQuery && byFollowUp;
    });
  }, [cluster, query, followUpOnly]);

  const totals = useMemo(() => {
    const members = filtered.reduce((sum, group) => sum + group.total, 0);
    const signed = filtered.reduce((sum, group) => sum + group.signedUp.length, 0);
    const missing = filtered.reduce((sum, group) => sum + group.notSignedUp.length, 0);
    const rate = members ? Math.round((signed / members) * 100) : 0;
    return { members, signed, missing, rate };
  }, [filtered]);

  const attentionGroups = useMemo(
    () => [...groups].filter((group) => group.notSignedUp.length > 0).sort((a, b) => b.notSignedUp.length - a.notSignedUp.length).slice(0, 4),
    []
  );

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[25%] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-200 shadow-sm backdrop-blur">
                <BarChart3 className="h-4 w-4 text-blue-200" />
                NE Youth Conference Tracker
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Dashboard: Lifegroup Sign Ups
              </h1>
              <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-cyan-300/30 bg-cyan-400/15 px-5 py-3 text-base font-semibold text-cyan-50 shadow-2xl shadow-cyan-950/30 backdrop-blur">
                <BarChart3 className="h-5 w-5 text-cyan-200" />
                <span>Data accurate as of 15 May, 2:48 AM</span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 shadow-2xl shadow-black/20 backdrop-blur">
              <p className="text-sm text-slate-300">Verified conference signups</p>
              <p className="mt-1 text-4xl font-semibold text-white">{VERIFIED_SIGNUPS}</p>
              <p className="mt-1 text-sm text-slate-400">{OVERALL_RATE}% overall completion</p>
            </div>
          </div>
        </motion.div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Members shown" value={totals.members} subtitle="Across filtered lifegroups" icon={Users} accent="blue" />
          <StatCard title="Signed up" value={totals.signed} subtitle="Verified registrations" icon={UserCheck} accent="green" />
          <StatCard title="Not signed up" value={totals.missing} subtitle="Members needing follow-up" icon={UserX} accent="rose" />
          <StatCard title="Signup rate" value={`${totals.rate}%`} subtitle="Filtered completion rate" icon={BarChart3} accent="violet" />
        </div>

        <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 backdrop-blur md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              <div className="relative w-full md:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search lifegroup or member name"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-9 pr-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-400/60"
                />
              </div>
              <div className="grid grid-cols-5 rounded-2xl border border-white/10 bg-slate-950/70 p-1">
                {clusters.map((option) => (
                  <button
                    key={option}
                    onClick={() => setCluster(option)}
                    className={`rounded-xl px-3 py-2 text-sm transition ${cluster === option ? "bg-blue-500 text-white shadow-lg shadow-blue-950/40" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setFollowUpOnly((value) => !value)}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition ${followUpOnly ? "border-blue-400/50 bg-blue-500 text-white" : "border-white/10 bg-slate-950/40 text-slate-300 hover:bg-white/10 hover:text-white"}`}
            >
              <Filter className="h-4 w-4" />
              {followUpOnly ? "Showing follow-up groups" : "Show only follow-up groups"}
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-4">
          {attentionGroups.map((group) => (
            <div key={group.name} className="rounded-3xl border border-amber-300/20 bg-amber-400/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-white">{group.displayName}</p>
                <span className="rounded-full bg-amber-300/20 px-2 py-1 text-xs text-amber-100">{group.notSignedUp.length} left</span>
              </div>
              <p className="mt-2 text-sm text-amber-100/80">Needs the most follow-up</p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {filtered.map((group, index) => {
            const status = getStatus(group.rate);
            const ticketNames = group.signedUp.filter((name) => ticketFollowUps[name]);
            return (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.25 }}
              >
                <div className="h-full rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-semibold text-white md:text-4xl">{group.displayName}</h2>
                      <p className="mt-2 text-lg font-medium text-slate-300">{group.total} Members</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-sm ${status.className}`}>{status.label}</span>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" style={{ width: `${group.rate}%` }} />
                    </div>
                    <span className="w-14 text-right text-sm font-semibold text-slate-200">{group.rate}%</span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-3xl border border-emerald-300/10 bg-emerald-400/10 p-4">
                      <div className="flex items-center gap-2 text-sm text-emerald-200">
                        <UserCheck className="h-4 w-4" />
                        Signed up
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-emerald-50">{group.signedUp.length}</p>
                    </div>
                    <div className="rounded-3xl border border-rose-300/10 bg-rose-400/10 p-4">
                      <div className="flex items-center gap-2 text-sm text-rose-200">
                        <UserX className="h-4 w-4" />
                        Not signed up
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-rose-50">{group.notSignedUp.length}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">Signed up members</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.signedUp.length ? group.signedUp.map((name) => {
                        const note = ticketFollowUps[name];
                        return (
                          <Pill key={`${group.name}-yes-${name}`} variant={note ? "ticket" : "signed"} note={note}>
                            {name}
                          </Pill>
                        );
                      }) : <p className="text-sm text-slate-400">No signups recorded yet.</p>}
                    </div>

                    {ticketNames.length ? (
                      <div className="mt-3 rounded-2xl border border-amber-300/15 bg-amber-400/5 px-3 py-2 text-xs text-amber-100/90">
                        <span className="font-medium text-amber-100">Signed up, ticket change needed:</span>{" "}
                        {ticketNames.map((name) => `${name}: ${ticketFollowUps[name]}`).join(" · ")}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-5">
                    <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">Needs follow-up</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.notSignedUp.length ? group.notSignedUp.map((name) => (
                        <Pill key={`${group.name}-no-${name}`} variant="missing">
                          {name}
                        </Pill>
                      )) : <p className="text-sm text-slate-400">Everyone in this lifegroup has signed up.</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
