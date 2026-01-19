import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Zap,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  Shield,
  ArrowRight,
  Play,
  Star,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FlowDesk</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--primary)/15,transparent)]" />
        <div className="container mx-auto px-4 py-24 md:px-6 md:py-32 lg:py-40">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Badge variant="secondary" className="mb-6 gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Now with AI-powered workflows
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Streamline your team&apos;s
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"> workflow</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              FlowDesk helps teams organize tasks, automate workflows, and collaborate seamlessly. 
              Boost productivity and ship faster with our intuitive platform.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="gap-2 px-8">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["Alex", "Maria", "David", "Sophie"].map((name) => (
                  <Avatar key={name} className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="font-semibold text-foreground">2,000+</span> teams
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 md:gap-16">
            {["Vercel", "Stripe", "Linear", "Notion", "Figma"].map((company) => (
              <span key={company} className="text-xl font-bold tracking-tight text-foreground">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage your team
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features to help your team collaborate, track progress, and deliver results.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: CheckCircle2,
              title: "Task Management",
              description: "Create, assign, and track tasks with ease. Set priorities, deadlines, and dependencies.",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Work together in real-time with comments, mentions, and shared workspaces.",
            },
            {
              icon: Zap,
              title: "Workflow Automation",
              description: "Automate repetitive tasks and create custom workflows to save time.",
            },
            {
              icon: BarChart3,
              title: "Analytics & Reports",
              description: "Get insights into team performance with detailed analytics and custom reports.",
            },
            {
              icon: Calendar,
              title: "Calendar Integration",
              description: "Sync with your calendar to manage deadlines and schedule meetings.",
            },
            {
              icon: MessageSquare,
              title: "Built-in Messaging",
              description: "Communicate directly within the platform without switching apps.",
            },
          ].map((feature) => (
            <Card key={feature.title} className="group transition-all duration-200 hover:shadow-md hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "500K+", label: "Tasks Completed" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold tracking-tight text-primary">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by teams worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our customers have to say about FlowDesk.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote: "FlowDesk has transformed how our team works. We've increased productivity by 40% since switching.",
              author: "Sarah Chen",
              role: "Product Manager at TechCorp",
              avatar: "Sarah",
            },
            {
              quote: "The workflow automation alone saves us hours every week. It's become essential to our operations.",
              author: "Michael Torres",
              role: "Engineering Lead at StartupXYZ",
              avatar: "Michael",
            },
            {
              quote: "Finally, a task management tool that doesn't get in the way. Clean, fast, and intuitive.",
              author: "Emily Johnson",
              role: "Design Director at CreativeStudio",
              avatar: "Emily",
            },
          ].map((testimonial) => (
            <Card key={testimonial.author} className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.avatar}`} />
                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-24 md:px-6 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that fits your team. No hidden fees.
            </p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$0",
                description: "Perfect for small teams getting started",
                features: ["Up to 5 team members", "Basic task management", "1GB storage", "Email support"],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$12",
                description: "For growing teams that need more power",
                features: ["Unlimited team members", "Advanced workflows", "25GB storage", "Priority support", "Analytics dashboard", "API access"],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations with custom needs",
                features: ["Everything in Pro", "Unlimited storage", "Custom integrations", "Dedicated support", "SSO & SAML", "99.99% SLA"],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan) => (
              <Card key={plan.name} className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/user/mo</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardContent className="pt-0">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 md:px-6 md:py-32">
        <Card className="mx-auto max-w-4xl bg-primary text-primary-foreground">
          <CardContent className="flex flex-col items-center p-12 text-center">
            <Shield className="mb-6 h-12 w-12" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to boost your team&apos;s productivity?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">
              Join thousands of teams already using FlowDesk to streamline their workflows and get more done.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">FlowDesk</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Streamline your team&apos;s productivity with the modern workflow management platform.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">Integrations</Link></li>
                <li><Link href="#" className="hover:text-foreground">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FlowDesk. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
