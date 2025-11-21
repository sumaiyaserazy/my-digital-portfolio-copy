import { SecurityDashboardCard } from "@/components/security-dashboard-card"
import { ExecutiveSecurityDashboard } from "@/components/executive-security-dashboard"
import { PenetrationTestResults } from "@/components/penetration-test-results"
import { TelemetryDashboard } from "@/components/telemetry-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Activity, FileText, Lock, Network } from "lucide-react"

export const metadata = {
  title: "Security Dashboard | CyberShield",
  description: "Security overview, threat model, and monitoring dashboard",
}

export default function SecurityPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Security Dashboard</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                Real-time security monitoring, threat model, and protection status with executive-level insights.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 space-y-12">
          {/* Executive Security Dashboard */}
          <ExecutiveSecurityDashboard />

          {/* Telemetry Dashboard - WAF, Arcjet, MCP */}
          <TelemetryDashboard />

          {/* Penetration Testing Results */}
          <PenetrationTestResults />
          {/* Threat Model */}
          <Card className="bg-background border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                <CardTitle>Threat Model</CardTitle>
              </div>
              <CardDescription>Identified threats and mitigation strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      Web Application Attacks
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Protection against SQL injection, XSS, CSRF, and other OWASP Top 10 vulnerabilities.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Network className="h-5 w-5 text-red-500" />
                      DDoS Attacks
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Rate limiting and traffic filtering to prevent distributed denial of service attacks.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Lock className="h-5 w-5 text-blue-500" />
                      Authentication Bypass
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Multi-factor authentication and secure session management to prevent unauthorized access.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      Data Breaches
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Encryption at rest and in transit, along with access controls to protect sensitive data.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Dashboard Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <SecurityDashboardCard
              title="Web Application Firewall (WAF)"
              description="Protection against web-based attacks"
              icon={<Shield className="h-8 w-8 text-primary" />}
              metrics={[
                {
                  name: "Requests Blocked",
                  status: "active",
                  value: "1,234",
                  description: "Last 24 hours"
                },
                {
                  name: "Threats Detected",
                  status: "warning",
                  value: "23",
                  description: "Active threats"
                },
                {
                  name: "Rules Active",
                  status: "active",
                  value: "156",
                  description: "WAF rules"
                }
              ]}
            />

            <SecurityDashboardCard
              title="MCP Security"
              description="Model Context Protocol security monitoring"
              icon={<Network className="h-8 w-8 text-primary" />}
              metrics={[
                {
                  name: "Active Connections",
                  status: "active",
                  value: "3",
                  description: "MCP servers"
                },
                {
                  name: "Requests/sec",
                  status: "active",
                  value: "12.5",
                  description: "Average"
                },
                {
                  name: "Error Rate",
                  status: "active",
                  value: "0.1%",
                  description: "Last hour"
                }
              ]}
            />

            <SecurityDashboardCard
              title="Rate Limiting"
              description="API and endpoint rate limiting status"
              icon={<Activity className="h-8 w-8 text-primary" />}
              metrics={[
                {
                  name: "Requests Allowed",
                  status: "active",
                  value: "45,678",
                  description: "Last 24 hours"
                },
                {
                  name: "Rate Limit Hits",
                  status: "warning",
                  value: "89",
                  description: "Blocked requests"
                },
                {
                  name: "Threshold",
                  status: "active",
                  value: "100/min",
                  description: "Per IP"
                }
              ]}
            />

            <SecurityDashboardCard
              title="Security Logs"
              description="Audit and security event logging"
              icon={<FileText className="h-8 w-8 text-primary" />}
              metrics={[
                {
                  name: "Events Logged",
                  status: "active",
                  value: "12,456",
                  description: "Last 24 hours"
                },
                {
                  name: "Critical Alerts",
                  status: "error",
                  value: "2",
                  description: "Requires attention"
                },
                {
                  name: "Log Retention",
                  status: "active",
                  value: "90 days",
                  description: "Policy"
                }
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

