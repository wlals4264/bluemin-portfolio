'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'framer-motion';

const SPRING_TOSS = { type: 'spring', stiffness: 180, damping: 20, mass: 0.9 } as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 72, scale: 0.94, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
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
  hidden: { opacity: 0, y: 32, scale: 0.92, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
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
  ref,
) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={shouldReduceMotion ? reducedSectionVariants : sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
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
