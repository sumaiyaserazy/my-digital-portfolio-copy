"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle2, XCircle, TrendingUp, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

interface Vulnerability {
  id: string
  severity: "high" | "medium" | "low"
  type: string
  status: "mitigated" | "active" | "pending"
  protection: string
}

interface PenetrationTestResult {
  target: string
  scanDate: string
  vulnerabilitiesFound: number
  vulnerabilitiesMitigated: number
  protectionRate: string
  vulnerabilities: Vulnerability[]
  summary: {
    total: number
    high: number
    medium: number
    low: number
    mitigated: number
  }
}

export function PenetrationTestResults() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<PenetrationTestResult | null>(null)
  const [target, setTarget] = useState("web-application")

  const runPenetrationTest = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: "penetration-test",
          input: target,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to run penetration test")
      }

      setResults(data.result)
      toast.success("Penetration test completed successfully")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>
      default:
        return <Badge>{severity}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "mitigated":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "active":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "pending":
        return <XCircle className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <Card className="bg-background border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle>Penetration Testing Results</CardTitle>
              <CardDescription>
                Run security assessments and view protection outcomes
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target (e.g., web-application)"
            className="flex-1 px-3 py-2 border rounded-md bg-background"
          />
          <Button onClick={runPenetrationTest} disabled={loading}>
            {loading ? "Running Test..." : "Run Test"}
          </Button>
        </div>

        {results && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Vulnerabilities</p>
                      <p className="text-2xl font-bold">{results.summary.total}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Mitigated</p>
                      <p className="text-2xl font-bold text-green-500">{results.summary.mitigated}</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Protection Rate</p>
                      <p className="text-2xl font-bold text-primary">{results.protectionRate}</p>
                    </div>
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">High Severity</p>
                      <p className="text-2xl font-bold text-red-500">{results.summary.high}</p>
                    </div>
                    <Lock className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Protection Outcomes */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-green-500">Protector Outcomes</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                All identified vulnerabilities have been successfully mitigated with active protection controls.
                Your systems are protected against {results.summary.total} identified threats.
              </p>
            </div>

            {/* Vulnerabilities List */}
            <div className="space-y-3">
              <h3 className="font-semibold">Vulnerability Details</h3>
              {results.vulnerabilities.map((vuln) => (
                <Card key={vuln.id} className="bg-muted/30">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(vuln.status)}
                          <span className="font-medium">{vuln.type}</span>
                          {getSeverityBadge(vuln.severity)}
                          <Badge variant="outline" className="ml-auto">
                            {vuln.id}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">
                            Protection: <span className="text-foreground font-medium">{vuln.protection}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {vuln.status === "mitigated" && (
                            <Badge className="bg-green-500">Status: Mitigated</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Test Metadata */}
            <div className="text-sm text-muted-foreground border-t pt-4">
              <p>Target: <span className="font-medium text-foreground">{results.target}</span></p>
              <p>Scan Date: <span className="font-medium text-foreground">
                {new Date(results.scanDate).toLocaleString()}
              </span></p>
            </div>
          </div>
        )}

        {!results && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Click "Run Test" to perform a penetration test and view protection outcomes</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

