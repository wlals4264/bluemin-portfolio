'use client';

import { forwardRef, useRef } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'framer-motion';

const SPRING_TOSS = { type: 'spring', stiffness: 180, damping: 20, mass: 0.9 } as const;

/* filter(blur)는 여기서 뺐다 — blur를 spring으로 물리면 가끔(특히 이 페이지처럼
   무거운 애니메이션이 여럿 겹칠 때) 스프링이 끝까지 수렴하지 못하고 blur(6px)
   근처에서 멈춰버리는 경우가 있었다. 그 상태로 멈추면 화면 전체가 뿌옇게 보일
   뿐 아니라, filter가 걸려 있는 엘리먼트는 자식의 box-shadow·hover 튀어나옴이
   그 필터 합성 버퍼 경계에서 잘려 보이는 부작용까지 같이 생긴다 —
   Projects 카드 hover 시 위아래가 잘리던 것도 결국 이게 원인이었다. */
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 72, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_TOSS,
  },
};

const reducedSectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_TOSS,
  },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

type RevealProps = HTMLMotionProps<'div'>;

/**
 * 스크롤에 걸리면 아래→위로 스프링감 있게 등장하는 섹션 래퍼 (토스 홈페이지류 등장 효과, 강화 버전).
 * 각 섹션의 최상위 forwardRef 대상을 그대로 대체하므로 헤더의 스크롤 이동은 그대로 동작한다.
 * prefers-reduced-motion이 설정된 사용자에게는 과감한 효과 대신 짧은 페이드만 적용한다.
 */
export const RevealSection = forwardRef<HTMLDivElement, RevealProps>(function RevealSection(
  { children, ...props },
  forwardedRef,
) {
  const shouldReduceMotion = useReducedMotion();
  const localRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      variants={shouldReduceMotion ? reducedSectionVariants : sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      onAnimationComplete={(definition) => {
        // 스프링이 목표값에 수렴해도 opacity:1/transform:translateY(0px)
        // scale(1) 같은 "사실상 원상태" 인라인 스타일은 그대로 남아있다.
        // transform이 남아있으면 이 엘리먼트가 계속 별도 합성 레이어로
        // 취급돼 자식(hover 시 튀어나오는 카드 그림자 등)이 예상 밖으로
        // 잘려 보일 수 있어 등장이 끝나면 인라인 스타일을 완전히 지운다.
        if (definition === 'visible' && localRef.current) {
          localRef.current.style.opacity = '';
          localRef.current.style.transform = '';
        }
      }}
      {...props}>
      {children}
    </motion.div>
  );
});

/** 리스트/그리드 항목을 순서대로 하나씩 등장시키는 부모 컨테이너. */
export function RevealGroup(props: RevealProps) {
  return (
    <motion.div
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    />
  );
}

/** RevealGroup 안에서 순서대로 fade+slide-up+scale 되는 개별 항목. */
export function RevealItem(props: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return <motion.div variants={shouldReduceMotion ? reducedItemVariants : itemVariants} {...props} />;
}
