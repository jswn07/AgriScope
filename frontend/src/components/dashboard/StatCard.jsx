function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold">
        {title}
      </h3>

      <p className={`text-4xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  )
}

export default StatCard