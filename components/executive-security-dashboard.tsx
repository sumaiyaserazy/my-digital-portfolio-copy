"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, AlertTriangle, CheckCircle2, Activity, Lock, Network, FileText } from "lucide-react"
import { useState, useEffect } from "react"

interface ProtectionMetric {
  name: string
  value: string | number
  change: string
  trend: "up" | "down" | "stable"
  status: "excellent" | "good" | "warning"
  description: string
}

interface ThreatBlocked {
  type: string
  count: number
  protection: string
  status: "blocked" | "mitigated"
}

export function ExecutiveSecurityDashboard() {
  const [metrics, setMetrics] = useState<ProtectionMetric[]>([
    {
      name: "Overall Protection Rate",
      value: "99.8%",
      change: "+2.3%",
      trend: "up",
      status: "excellent",
      description: "All critical vulnerabilities mitigated"
    },
    {
      name: "Threats Blocked (24h)",
      value: "1,802",
      change: "+15%",
      trend: "up",
      status: "excellent",
      description: "Active protection layers functioning"
    },
    {
      name: "Mean Time to Mitigation",
      value: "2.4h",
      change: "-0.8h",
      trend: "up",
      status: "excellent",
      description: "Rapid response to threats"
    },
    {
      name: "Security Posture Score",
      value: "94/100",
      change: "+4",
      trend: "up",
      status: "excellent",
      description: "Above industry average"
    }
  ])

  const [threatsBlocked] = useState<ThreatBlocked[]>([
    { type: "SQL Injection", count: 456, protection: "WAF Rules", status: "blocked" },
    { type: "XSS Attacks", count: 234, protection: "CSP Headers", status: "blocked" },
    { type: "DDoS Attempts", count: 789, protection: "Rate Limiting", status: "blocked" },
    { type: "Brute Force", count: 123, protection: "Account Lockout", status: "blocked" },
    { type: "Unauthorized Access", count: 200, protection: "MFA + RBAC", status: "blocked" }
  ])

  const [protectionLayers] = useState([
    { name: "Web Application Firewall", status: "active", coverage: "100%", threatsBlocked: 1234 },
    { name: "Intrusion Detection System", status: "active", coverage: "98%", threatsBlocked: 456 },
    { name: "Rate Limiting", status: "active", coverage: "100%", threatsBlocked: 89 },
    { name: "DDoS Protection", status: "active", coverage: "100%", threatsBlocked: 789 },
    { name: "Authentication Controls", status: "active", coverage: "100%", threatsBlocked: 323 }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "warning":
        return "text-yellow-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Executive Security Dashboard</h2>
          <p className="text-muted-foreground">Protector outcomes and security posture overview</p>
        </div>
        <Badge className="bg-green-500">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          All Systems Protected
        </Badge>
      </div>

      {/* Key Protection Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-background border-primary/20">
            <CardHeader className="pb-3">
              <CardDescription>{metric.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-3xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {getTrendIcon(metric.trend)}
                    <span className="text-sm text-muted-foreground">{metric.change}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${
                  metric.status === "excellent" ? "bg-green-500/10" : 
                  metric.status === "good" ? "bg-blue-500/10" : 
                  "bg-yellow-500/10"
                }`}>
                  {metric.status === "excellent" ? (
                    <Shield className={`h-6 w-6 ${getStatusColor(metric.status)}`} />
                  ) : metric.status === "good" ? (
                    <CheckCircle2 className={`h-6 w-6 ${getStatusColor(metric.status)}`} />
                  ) : (
                    <AlertTriangle className={`h-6 w-6 ${getStatusColor(metric.status)}`} />
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Protection Outcomes Highlight */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-green-500">Protector Outcomes</CardTitle>
              <CardDescription>
                Comprehensive protection coverage with active threat mitigation
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Threats Blocked</p>
              <p className="text-3xl font-bold text-green-500">
                {threatsBlocked.reduce((sum, t) => sum + t.count, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Protection Layers</p>
              <p className="text-3xl font-bold text-primary">
                {protectionLayers.length}
              </p>
              <p className="text-xs text-muted-foreground">All operational</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Vulnerability Mitigation Rate</p>
              <p className="text-3xl font-bold text-blue-500">100%</p>
              <p className="text-xs text-muted-foreground">All critical issues resolved</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Threats Blocked Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-background border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Threats Blocked by Type</CardTitle>
            </div>
            <CardDescription>Real-time threat mitigation breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {threatsBlocked.map((threat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{threat.type}</span>
                      <Badge variant="outline" className="ml-2">{threat.protection}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {threat.count.toLocaleString()} attempts blocked
                    </p>
                  </div>
                  <Badge className="bg-green-500">Blocked</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Network className="h-6 w-6 text-primary" />
              <CardTitle>Protection Layer Status</CardTitle>
            </div>
            <CardDescription>Active security controls and coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {protectionLayers.map((layer, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="font-medium">{layer.name}</span>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Coverage: {layer.coverage}</span>
                    <span className="text-muted-foreground">
                      {layer.threatsBlocked.toLocaleString()} blocked
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Posture Summary */}
      <Card className="bg-background border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-primary" />
            <CardTitle>Security Posture Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Network Security</span>
                <Badge className="bg-green-500">Protected</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Application Security</span>
                <Badge className="bg-green-500">Protected</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Protection</span>
                <Badge className="bg-green-500">Protected</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full"></div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-500">All Systems Protected</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Comprehensive security controls are active and protecting against all identified threat vectors.
                  Protection outcomes demonstrate 100% mitigation rate for critical vulnerabilities.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

