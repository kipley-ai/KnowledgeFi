import { useRef, useEffect } from 'react';
import { TweenMax, TimelineMax, Power1, Power3, Elastic, Linear, SteppedEase } from 'gsap';

const Loader: React.FC = () => {
  const globalSVGref = useRef<SVGSVGElement>(null);
  const arrowRef = useRef<SVGPathElement>(null);
  const arrowLineRef = useRef<SVGPathElement>(null);
  const arrowDownRef = useRef<SVGPathElement>(null);
  const outlineRef = useRef<SVGPathElement>(null);
  const outlineBgRef = useRef<SVGPathElement>(null);
  const baseEndRef = useRef<SVGPathElement>(null);
  const baseStartRef = useRef<SVGPathElement>(null);
  const validateRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const globalSVG = globalSVGref.current;
    const outline = outlineRef.current;
    const outlineBg = outlineBgRef.current;
    const baseStart = baseStartRef.current;
    const baseEnd = baseEndRef.current;
    const arrow = arrowRef.current;
    const validate = validateRef.current;

    if (!globalSVG || !outline || !outlineBg || !baseStart || !baseEnd || !arrow || !validate) return;

    TweenMax.set(globalSVG, { visibility: 'visible' });
    TweenMax.set(outline, { stroke: 'transparent', drawSVG: '38% 60%', transformOrigin: '50% 50%' });
    TweenMax.set(outlineBg, { drawSVG: '50% 50%', rotation: '-90', transformOrigin: '50% 50%' });

    const tl = new TimelineMax({ repeat: -1 });
    tl.to(arrow, 0.5, { y: -7, ease: Power1.easeOut })
      .to(arrow, 0.5, { y: 7, ease: Power3.easeIn })
      .to(baseStart, 0.05, { morphSVG: { shape: baseEnd }, ease: Linear.easeNone }, '-=0.05')
      .to(arrow, 2, { y: 0, ease: Elastic.easeOut.config(0.8, 0.6) })
      .set(outline, { stroke: '#00efeb' }, '-=2')
      .set(baseStart, { stroke: 'transparent' }, '-=2')
      .to(outline, 2, { drawSVG: '100% 100%', ease: 'Anticipate.easeOut' }, '-=2')
      .to(outlineBg, 2, { drawSVG: '0% 100%', ease: 'Anticipate.easeOut' }, '-=2')
      .to(outline, 4, { drawSVG: '100% 0%', ease: 'SteppedEase.config(36)' }, '-=0')
      .to(arrow, 1.2, { y: 80, ease: 'Anticipate.easeOut' })
      .from(validate, 1.2, { y: -80, stroke: '#5fefc0', ease: 'Power3.easeInOut', transformOrigin: '50% 50%' }, '-=1.2')
      .fromTo(arrow, 1, { y: -100 }, { y: 0, delay: 1, immediateRender: false, ease: 'Anticipate.easeOut' })
      .to(validate, 1, { y: 80, ease: 'Anticipate.easeIn', transformOrigin: '50% 50%' }, '-=1')
      .to(outline, 1, { drawSVG: '38% 60%' }, '-=1')
      .to(outlineBg, 1, { drawSVG: '50% 50%', ease: 'Power2.easeInOut' }, '-=0.9')
      .set(outline, { stroke: 'transparent' })
      .set(baseStart, { stroke: '#00efeb' })
      .to(baseStart, 1, { morphSVG: { shape: baseStart }, ease: 'Elastic.easeOut.config(1, 0.4)' });
    tl.timeScale(1.52);

    return () => {
      tl.kill(); // Clean up the timeline on component unmount
    };
  }, []);

  return (
    <svg viewBox="0 0 51 51" ref={globalSVGref}>
      {/* Your SVG paths go here */}
    </svg>
  );
};

export default Loader;