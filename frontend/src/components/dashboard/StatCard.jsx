import { Card,CardContent } from "@/components/ui/card"

function StatCard({ title, value, color }) {
  return (
    <Card
      className="
        border-[#C5D89D]/40
        shadow-sm
        hover:shadow-md
        transition-all
        duration-200
        bg-white/90
        backdrop-blur
      "
    >
      <CardContent className="p-6">
        <p className="text-sm font-medium text-[#5C6452] mb-3">
          {title}
        </p>

        <h3 className={`text-3xl font-semibold tracking-tight ${color}`}>
          {value}
        </h3>
      </CardContent>
    </Card>
  )
}

export default StatCard