import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Textarea } from './components/ui/textarea';
import { Input } from './components/ui/input';
import { ScrollArea } from './components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Eye, EyeOff, Mic, RotateCcw, ChevronRight, Briefcase, Brain, ShieldCheck, ServerCog } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Core',
    difficulty: 'High',
    question: 'Tell me about yourself.',
    intent: 'Establish your credibility, seniority, and relevance quickly.',
    strongAnswer: `I’m a Power Platform Architect with strong hands-on experience across Dataverse, Power Apps, Power Automate, plugins, custom APIs, and enterprise solution design. A big part of my work is making sure solutions are not only delivered quickly, but are maintainable, scalable, and governed properly. I spend a lot of time deciding where low-code is appropriate and where server-side logic, integration services, or more structured patterns are the better fit.`,
    points: [
      'Lead with current role and platform depth',
      'Mention enterprise-scale solution design',
      'Emphasise maintainability, scale, and governance',
      'Do not ramble through your entire career history'
    ]
  },
  {
    id: 2,
    category: 'Motivation',
    difficulty: 'Medium',
    question: 'Why are you interested in this role?',
    intent: 'Check role fit and whether your motivation sounds credible.',
    strongAnswer: `It looks like a good fit because it sits in that space between hands-on development and sound solution design. I enjoy working in Microsoft platform environments where there’s a mix of application delivery, integration, and architectural thinking. The government context is also appealing because it tends to value structure, risk awareness, documentation, and maintainability, which suits how I like to work.`,
    points: [
      'Frame the role as a fit for your strengths',
      'Show interest in Microsoft platform work',
      'Mention government-friendly traits like structure and risk awareness',
      'Avoid sounding like you just want any contract'
    ]
  },
  {
    id: 3,
    category: 'Azure',
    difficulty: 'High',
    question: 'What experience do you have with Azure?',
    intent: 'Test how honestly and confidently you can map your experience to Azure-oriented architecture.',
    strongAnswer: `My strongest practical background is across the Microsoft business application stack, but a lot of the design thinking overlaps directly with Azure patterns. I’m very comfortable talking through where Functions, Logic Apps, messaging, APIs, and identity services fit in an enterprise architecture, especially alongside Power Platform. My focus is on choosing the right execution layer and integration approach rather than forcing everything into low-code tooling.`,
    points: [
      'Be honest about where your deepest experience sits',
      'Show architectural understanding of Azure services',
      'Emphasise execution-layer decision making',
      'Do not bluff specific delivery experience you cannot defend'
    ]
  },
  {
    id: 4,
    category: 'Functions',
    difficulty: 'High',
    question: 'When would you use Azure Functions instead of Power Automate?',
    intent: 'Test judgement about backend execution and scale.',
    strongAnswer: `I’d look at Azure Functions when the requirement involves heavier custom logic, code reuse, stronger performance control, more complex processing, or secure backend execution that doesn’t sit neatly in a flow. Power Automate is great for orchestration and productivity scenarios, but Functions are often a better fit when the workload starts to look like application backend logic.`,
    points: [
      'Heavy logic',
      'Performance and scale',
      'Reusable backend services',
      'Secure execution without overloading flows'
    ]
  },
  {
    id: 5,
    category: 'Integration',
    difficulty: 'High',
    question: 'When would you use Logic Apps instead of Power Automate?',
    intent: 'See whether you understand enterprise integration boundaries.',
    strongAnswer: `I’d lean toward Logic Apps when the workflow is really an enterprise integration problem rather than a business-user automation problem. For example, system-to-system orchestration, higher-volume interfaces, stronger DevOps control, and more formal integration patterns.`,
    points: [
      'System-to-system integration',
      'Higher volume and reliability',
      'Better DevOps and deployment control',
      'Enterprise integration patterns'
    ]
  },
  {
    id: 6,
    category: 'API Design',
    difficulty: 'High',
    question: 'What makes a good API?',
    intent: 'Assess whether you think clearly about contracts and integration quality.',
    strongAnswer: `A good API has a clear purpose, stable contracts, sensible error handling, proper security, and doesn’t expose unnecessary internal complexity. It should be easy for a consuming app or system to understand, resilient enough to evolve over time, and designed to avoid tight coupling.`,
    points: [
      'Clear purpose',
      'Stable request and response contracts',
      'Security and authorisation',
      'Versioning and low coupling'
    ]
  },
  {
    id: 7,
    category: 'Messaging',
    difficulty: 'Medium',
    question: 'Why use messaging or Service Bus?',
    intent: 'Test whether you understand decoupling and asynchronous architecture.',
    strongAnswer: `Messaging is useful when you want to decouple systems and avoid fragile synchronous dependencies. It allows one part of the solution to publish work and another part to process it independently, which helps with spikes in load, resilience, and scalability.`,
    points: [
      'Decoupling',
      'Asynchronous processing',
      'Scalability',
      'Resilience and retry handling'
    ]
  },
  {
    id: 8,
    category: 'Architecture',
    difficulty: 'High',
    question: 'How do you approach solution design?',
    intent: 'Assess whether you have a structured design method.',
    strongAnswer: `I start with the business need and the operational constraints, then work through the data model, security model, execution layers, and integration points. A lot of the design work is deciding what belongs in the app, what belongs in workflow, what belongs in backend logic, and where asynchronous patterns make sense. I also think early about ALM, supportability, and how the solution will evolve.`,
    points: [
      'Business need and constraints first',
      'Data and security model',
      'Choose the right execution layer',
      'Consider ALM and supportability early'
    ]
  },
  {
    id: 9,
    category: 'Performance',
    difficulty: 'Medium',
    question: 'How do you manage performance and scalability?',
    intent: 'See whether you think preventatively rather than reactively.',
    strongAnswer: `I try to solve that through architecture choices early rather than leaving it until the end. That includes reducing unnecessary chattiness, keeping business logic in the right layer, using asynchronous patterns where appropriate, avoiding overuse of flows for heavy workloads, and making sure the data model supports the expected behaviour.`,
    points: [
      'Prevent problems through design',
      'Reduce chattiness',
      'Use the right layer for logic',
      'Use async patterns where appropriate'
    ]
  },
  {
    id: 10,
    category: 'Stakeholders',
    difficulty: 'Medium',
    question: 'How do you work with non-technical stakeholders?',
    intent: 'Test communication maturity.',
    strongAnswer: `I try to translate technical decisions into business consequences. For example, instead of saying a solution is tightly coupled, I’d explain that a change in one area will create delivery risk somewhere else. Good stakeholder communication is really about clarity, expectation-setting, and making trade-offs understandable.`,
    points: [
      'Translate technical choices into business impact',
      'Clarity over jargon',
      'Expectation-setting',
      'Make trade-offs understandable'
    ]
  },
  {
    id: 11,
    category: 'Governance',
    difficulty: 'Medium',
    question: 'How do you balance speed with governance?',
    intent: 'Check enterprise maturity.',
    strongAnswer: `I don’t see those as opposites. The best way to move quickly in enterprise environments is to have enough structure that delivery stays controlled. Good standards, clear ALM, naming, environment strategy, and architecture guardrails usually make delivery faster over time, not slower.`,
    points: [
      'Governance enables speed',
      'Standards and ALM reduce chaos',
      'Environment strategy matters',
      'Guardrails improve long-term delivery'
    ]
  },
  {
    id: 12,
    category: 'Value',
    difficulty: 'Medium',
    question: 'What do you bring to this team?',
    intent: 'Get you to summarise your value clearly.',
    strongAnswer: `I bring strong Microsoft platform depth, a practical architecture mindset, and a hands-on approach. I’m comfortable designing, building, explaining trade-offs, and helping shape solutions that are sustainable rather than just fast to produce.`,
    points: [
      'Platform depth',
      'Architecture judgement',
      'Hands-on capability',
      'Sustainable solutions'
    ]
  }
];

const concepts = [
  {
    title: 'Azure Functions',
    icon: ServerCog,
    summary: 'Serverless backend code execution triggered by HTTP, timers, queues, or events.',
    cue: 'Use when the problem starts looking like backend application logic rather than workflow orchestration.'
  },
  {
    title: 'Logic Apps',
    icon: Briefcase,
    summary: 'Azure workflow and integration orchestration for system-to-system processes.',
    cue: 'Use when the problem is enterprise integration, not just business-user automation.'
  },
  {
    title: 'API Design',
    icon: Brain,
    summary: 'Creating stable, secure interfaces that expose business capability cleanly.',
    cue: 'Think contracts, security, versioning, and low coupling.'
  },
  {
    title: 'Service Bus / Messaging',
    icon: ShieldCheck,
    summary: 'Asynchronous communication via queues and topics for decoupling and resilience.',
    cue: 'Use when immediate synchronous dependency creates risk, scale issues, or brittleness.'
  }
];

export default function InteractiveMockInterviewTool() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState('');
  const [completed, setCompleted] = useState([]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const haystack = `${q.question} ${q.category} ${q.intent}`.toLowerCase();
      return haystack.includes(filter.toLowerCase());
    });
  }, [filter]);

  const current = filteredQuestions[index] || filteredQuestions[0];
  const progress = filteredQuestions.length ? ((index + 1) / filteredQuestions.length) * 100 : 0;

  const nextQuestion = () => {
    if (!current) return;
    setShowAnswer(false);
    setCompleted((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));
    setIndex((prev) => Math.min(prev + 1, Math.max(filteredQuestions.length - 1, 0)));
  };

  const prevQuestion = () => {
    setShowAnswer(false);
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const resetSession = () => {
    setIndex(0);
    setShowAnswer(false);
    setCompleted([]);
    setNotes('');
    setFilter('');
  };

  const jumpToQuestion = (targetIndex) => {
    setShowAnswer(false);
    setIndex(targetIndex);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Interview Prep Console</CardTitle>
              <CardDescription>
                Interactive mock interview for QLDGJP00011721 with model answers, cues, and coaching prompts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setIndex(0);
                }}
                placeholder="Search questions or category"
                className="rounded-xl"
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{completed.length}/{filteredQuestions.length || 0} completed</span>
                </div>
                <Progress value={progress} />
              </div>
              <div className="flex gap-2">
                <Button onClick={resetSession} variant="outline" className="w-full rounded-xl">
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Question Bank</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[420px] pr-3">
                <div className="space-y-2">
                  {filteredQuestions.map((q, i) => (
                    <button
                      key={q.id}
                      onClick={() => jumpToQuestion(i)}
                      className={`w-full rounded-2xl border p-3 text-left transition ${current?.id === q.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white hover:bg-slate-100'}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs opacity-70">{q.category}</div>
                          <div className="text-sm font-medium leading-snug">{q.question}</div>
                        </div>
                        {completed.includes(q.id) && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{current?.category || 'No results'}</Badge>
                {current && <Badge variant="outline">Difficulty: {current.difficulty}</Badge>}
              </div>
              <CardTitle className="text-3xl leading-tight">{current?.question || 'No matching questions found'}</CardTitle>
              <CardDescription>{current?.intent}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setShowAnswer((s) => !s)} className="rounded-xl">
                  {showAnswer ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                  {showAnswer ? 'Hide recommended response' : 'View recommended response'}
                </Button>
                <Button variant="outline" onClick={prevQuestion} className="rounded-xl">Previous</Button>
                <Button variant="outline" onClick={nextQuestion} className="rounded-xl">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <AnimatePresence>
                {showAnswer && current && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <Card className="rounded-2xl border-slate-300 bg-slate-50">
                      <CardHeader>
                        <CardTitle className="text-xl">Recommended response</CardTitle>
                        <CardDescription>Use this as a structure and adapt it to your natural speaking style.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="whitespace-pre-line text-sm leading-7">{current.strongAnswer}</p>
                        <div>
                          <div className="mb-2 text-sm font-semibold">Key points to hit</div>
                          <ul className="space-y-2 text-sm">
                            {current.points.map((point) => (
                              <li key={point} className="rounded-xl bg-white p-3">{point}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Mic className="h-4 w-4" /> Your practice notes
                </div>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your own version here, tighten phrasing, or note weak spots to fix."
                  className="min-h-[180px] rounded-2xl"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="concepts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-2xl">
              <TabsTrigger value="concepts">Concept cues</TabsTrigger>
              <TabsTrigger value="ask">Questions to ask them</TabsTrigger>
            </TabsList>

            <TabsContent value="concepts">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Fast technical cues</CardTitle>
                  <CardDescription>These are short reminders to help you explain adjacent Azure concepts cleanly in the interview.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {concepts.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={item.title} whileHover={{ y: -2 }}>
                        <Card className="rounded-2xl border-slate-200">
                          <CardContent className="p-5">
                            <div className="mb-3 flex items-center gap-3">
                              <div className="rounded-2xl bg-slate-100 p-3"><Icon className="h-5 w-5" /></div>
                              <div className="font-semibold">{item.title}</div>
                            </div>
                            <p className="mb-3 text-sm leading-6">{item.summary}</p>
                            <div className="rounded-xl bg-slate-50 p-3 text-sm">{item.cue}</div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ask">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Smart questions to ask the panel</CardTitle>
                  <CardDescription>Use these near the end to sound senior, practical, and genuinely engaged.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {[
                      'What is driving the hire: delivery pressure, platform uplift, or specific architectural gaps?',
                      'How much of the role is hands-on development versus solution design and coordination?',
                      'What is the current split between Power Platform and Azure services in the environment?',
                      'Are there existing integration, reliability, or scalability pain points the team wants this person to help address?',
                      'How mature is the current ALM and release process?',
                      'What would success look like in the first three months?'
                    ].map((q, idx) => (
                      <AccordionItem value={`item-${idx}`} key={q}>
                        <AccordionTrigger>{q}</AccordionTrigger>
                        <AccordionContent>
                          Ask this if the conversation has gone well and you want to signal that you think in terms of delivery context, architecture risk, and team impact.
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
