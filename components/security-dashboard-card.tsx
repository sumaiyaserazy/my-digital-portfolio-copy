import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Activity, FileText, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SecurityMetric {
  name: string
  status: "active" | "warning" | "error"
  value: string | number
  description?: string
}

interface SecurityDashboardCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  metrics: SecurityMetric[]
}

export function SecurityDashboardCard({ title, description, icon, metrics }: SecurityDashboardCardProps) {
  const getStatusIcon = (status: SecurityMetric["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: SecurityMetric["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>
      case "warning":
        return <Badge variant="default" className="bg-yellow-500">Warning</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="bg-background border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon || <Shield className="h-8 w-8 text-primary" />}
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(metric.status)}
                <div>
                  <p className="font-medium">{metric.name}</p>
                  {metric.description && (
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{metric.value}</span>
                {getStatusBadge(metric.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

