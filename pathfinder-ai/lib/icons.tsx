import { 
  Cpu, Wrench, HeartPulse, Scale, Palette, LineChart, FlaskConical, Database, BookOpen, 
  PenTool, Mic, Briefcase, Brain, Leaf, Shield, Gamepad2, Rocket, Microscope, Megaphone,
  Globe, GraduationCap
} from 'lucide-react';
import React from 'react';

export function getFieldIcon(field: string, className: string = "w-4 h-4 inline-block") {
  const props = { className, strokeWidth: 2 };
  switch(field) {
    case 'Technology': return <Cpu {...props} />;
    case 'Engineering': return <Wrench {...props} />;
    case 'Medicine': return <HeartPulse {...props} />;
    case 'Law': return <Scale {...props} />;
    case 'Design': return <Palette {...props} />;
    case 'Finance': return <LineChart {...props} />;
    case 'Science': return <FlaskConical {...props} />;
    case 'Data & AI': return <Database {...props} />;
    case 'Education': return <BookOpen {...props} />;
    case 'Architecture': return <PenTool {...props} />;
    case 'Media & Journalism': return <Mic {...props} />;
    case 'Entrepreneurship': return <Briefcase {...props} />;
    case 'Psychology': return <Brain {...props} />;
    case 'Environmental': return <Leaf {...props} />;
    case 'Cybersecurity': return <Shield {...props} />;
    case 'Gaming': return <Gamepad2 {...props} />;
    case 'Aerospace': return <Rocket {...props} />;
    case 'Biotech': return <Microscope {...props} />;
    case 'Marketing': return <Megaphone {...props} />;
    default: return <Globe {...props} />;
  }
}
