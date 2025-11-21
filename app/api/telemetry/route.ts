import { NextRequest, NextResponse } from "next/server"

// Telemetry data for WAF, Arcjet, and MCP
// In production, this would fetch from actual monitoring systems

interface WAFTelemetry {
  requestsBlocked: number
  requestsAllowed: number
  threatsDetected: number
  rulesActive: number
  topThreats: Array<{ type: string; count: number }>
  responseTime: string
  uptime: string
  last24h: {
    blocked: number
    allowed: number
    threats: number
  }
}

interface ArcjetTelemetry {
  requestsAnalyzed: number
  threatsBlocked: number
  rateLimitHits: number
  botDetections: number
  suspiciousActivity: number
  protectionRate: string
  avgResponseTime: string
  last24h: {
    analyzed: number
    blocked: number
    rateLimited: number
  }
  topProtections: Array<{ type: string; count: number }>
}

interface MCPTelemetry {
  activeConnections: number
  requestsPerSecond: number
  totalRequests: number
  errorRate: string
  avgLatency: string
  toolsActive: number
  last24h: {
    requests: number
    errors: number
    successful: number
  }
  serverStatus: Array<{ name: string; status: string; requests: number }>
}

export interface TelemetryData {
  waf: WAFTelemetry
  arcjet: ArcjetTelemetry
  mcp: MCPTelemetry
  timestamp: string
}

export async function GET(request: NextRequest) {
  try {
    // Simulate telemetry data
    // In production, this would fetch from actual monitoring systems
    
    const wafTelemetry: WAFTelemetry = {
      requestsBlocked: 1234,
      requestsAllowed: 45678,
      threatsDetected: 23,
      rulesActive: 156,
      topThreats: [
        { type: "SQL Injection", count: 456 },
        { type: "XSS", count: 234 },
        { type: "CSRF", count: 189 },
        { type: "Path Traversal", count: 123 },
        { type: "Command Injection", count: 98 }
      ],
      responseTime: "12ms",
      uptime: "99.9%",
      last24h: {
        blocked: 1234,
        allowed: 45678,
        threats: 23
      }
    }

    const arcjetTelemetry: ArcjetTelemetry = {
      requestsAnalyzed: 67890,
      threatsBlocked: 567,
      rateLimitHits: 234,
      botDetections: 123,
      suspiciousActivity: 45,
      protectionRate: "99.2%",
      avgResponseTime: "8ms",
      last24h: {
        analyzed: 67890,
        blocked: 567,
        rateLimited: 234
      },
      topProtections: [
        { type: "Rate Limiting", count: 234 },
        { type: "Bot Detection", count: 123 },
        { type: "IP Reputation", count: 89 },
        { type: "Behavioral Analysis", count: 67 },
        { type: "Geolocation Filtering", count: 54 }
      ]
    }

    const mcpTelemetry: MCPTelemetry = {
      activeConnections: 3,
      requestsPerSecond: 12.5,
      totalRequests: 108000,
      errorRate: "0.1%",
      avgLatency: "45ms",
      toolsActive: 6,
      last24h: {
        requests: 108000,
        errors: 108,
        successful: 107892
      },
      serverStatus: [
        { name: "roll-dice-server", status: "active", requests: 36000 },
        { name: "person-app-server", status: "active", requests: 42000 },
        { name: "digital-twin-server", status: "active", requests: 30000 }
      ]
    }

    const telemetryData: TelemetryData = {
      waf: wafTelemetry,
      arcjet: arcjetTelemetry,
      mcp: mcpTelemetry,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(telemetryData)
  } catch (error) {
    console.error("Telemetry fetch error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}

