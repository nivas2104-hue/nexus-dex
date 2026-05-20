import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

const data = [
  { day: "Mon", value: 320000 },
  { day: "Tue", value: 340000 },
  { day: "Wed", value: 360000 },
  { day: "Thu", value: 390000 },
  { day: "Fri", value: 410000 },
  { day: "Sat", value: 424000 },
  { day: "Sun", value: 435000 },
];

export default function PortfolioChart() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 overflow-hidden relative">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-400/10 blur-[120px]" />

      <div className="relative z-10">
        <div className="mb-8">
          <p className="text-zinc-500 text-sm uppercase tracking-[0.2em]">
            Portfolio Growth
          </p>

          <h2 className="text-5xl font-black mt-3">Live Performance</h2>
        </div>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#67e8f9" stopOpacity={0.8} />

                  <stop offset="100%" stopColor="#67e8f9" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="day" stroke="#666" />

              <Tooltip
                contentStyle={{
                  background: "#09090b",

                  border: "1px solid rgba(255,255,255,0.1)",

                  borderRadius: "16px",

                  color: "white",
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#67e8f9"
                strokeWidth={4}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
