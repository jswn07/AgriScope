function PageHeader({ title, description }) {
  return (
    <div className="mb-10">
      <h1 className="text-5xl font-black tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export default PageHeader