import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, FileCode, Lock, Server, Users, Network, Database } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const iconMap = {
  AlertTriangle: AlertTriangle,
  Shield: Shield,
  FileCode: FileCode,
  Lock: Lock,
  Server: Server,
  Users: Users,
  Network: Network,
  Database: Database
}

interface ProjectCardProps {
  title: string
  description: string
  week?: number
  icon?: keyof typeof iconMap
  href?: string
}

export function ProjectCard({ title, description, week, icon = "Shield", href }: ProjectCardProps) {
  const IconComponent = iconMap[icon] || Shield

  return (
    <Card className="bg-background border-primary/20 hover:border-primary/50 transition-all">
      <CardHeader>
        <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        {week && (
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
            Week {week}
          </div>
        )}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {href && (
        <CardContent>
          <Button variant="outline" asChild>
            <Link href={href}>View Details</Link>
          </Button>
        </CardContent>
      )}
    </Card>
  )
}

