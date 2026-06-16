import { Card, CardContent } from "@/components/ui/card"

function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={18} className="text-primary" />
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        <h3 className="text-4xl font-black text-foreground break-words">{value}</h3>
      </CardContent>
    </Card>
  )
}

export default StatCard