import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Type, Image as ImageIcon, Layers } from "lucide-react"

export const metadata = {
  title: "Professional Branding | CyberShield",
  description: "Color palette, typography, and branding guidelines",
}

export default function ProfessionalPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Professional Branding</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                Design system, color palette, typography, and branding guidelines.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 space-y-12">
          {/* Color Palette */}
          <Card className="bg-background border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Palette className="h-8 w-8 text-primary" />
                <CardTitle>Color Palette</CardTitle>
              </div>
              <CardDescription>Primary colors used throughout the portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="h-24 rounded-lg bg-primary"></div>
                  <div>
                    <p className="font-semibold">Primary</p>
                    <p className="text-sm text-muted-foreground">hsl(217.2, 91.2%, 59.8%)</p>
                    <p className="text-sm text-muted-foreground">#3b82f6</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-lg bg-secondary"></div>
                  <div>
                    <p className="font-semibold">Secondary</p>
                    <p className="text-sm text-muted-foreground">hsl(240, 3.7%, 15.9%)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-lg bg-accent"></div>
                  <div>
                    <p className="font-semibold">Accent</p>
                    <p className="text-sm text-muted-foreground">hsl(240, 3.7%, 15.9%)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-lg bg-destructive"></div>
                  <div>
                    <p className="font-semibold">Destructive</p>
                    <p className="text-sm text-muted-foreground">hsl(0, 62.8%, 30.6%)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card className="bg-background border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Type className="h-8 w-8 text-primary" />
                <CardTitle>Typography</CardTitle>
              </div>
              <CardDescription>Font families and text styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Primary Font</p>
                <p className="text-2xl font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Inter
                </p>
                <p className="text-muted-foreground mt-2">
                  Inter is used for all body text, headings, and UI elements. It provides excellent readability
                  across all screen sizes.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Heading Styles</p>
                  <h1 className="text-4xl font-bold">Heading 1</h1>
                  <h2 className="text-3xl font-bold">Heading 2</h2>
                  <h3 className="text-2xl font-semibold">Heading 3</h3>
                  <h4 className="text-xl font-semibold">Heading 4</h4>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Body Text</p>
                  <p className="text-base">Regular body text for paragraphs and descriptions.</p>
                  <p className="text-sm text-muted-foreground">Small text for captions and metadata.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branding Rules */}
          <Card className="bg-background border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Layers className="h-8 w-8 text-primary" />
                <CardTitle>Branding Guidelines</CardTitle>
              </div>
              <CardDescription>Rules and best practices for brand consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Logo Usage</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Use the Shield icon as the primary logo element</li>
                    <li>Maintain minimum clear space around the logo</li>
                    <li>Use primary color (#3b82f6) for logo in light mode</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Color Usage</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Primary color for CTAs, links, and important elements</li>
                    <li>Use dark backgrounds (black/dark gray) for hero sections</li>
                    <li>Maintain sufficient contrast ratios for accessibility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Spacing & Layout</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Use consistent padding and margins (multiples of 4px)</li>
                    <li>Container max-width: 1400px for 2xl screens</li>
                    <li>Section padding: py-12 md:py-24 lg:py-32</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Imagery</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Use cybersecurity-themed images and illustrations</li>
                    <li>Maintain consistent aspect ratios for project images</li>
                    <li>Apply subtle overlays and effects for visual consistency</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

