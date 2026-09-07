'use client';

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

const EASE_TOSS = [0.16, 1, 0.3, 1] as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_TOSS },
  },
};

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_TOSS },
  },
};

type RevealProps = HTMLMotionProps<'div'>;

/**
 * 스크롤에 걸리면 아래→위로 페이드인하는 섹션 래퍼 (토스 홈페이지류 등장 효과).
 * 각 섹션의 최상위 forwardRef 대상을 그대로 대체하므로 헤더의 스크롤 이동은 그대로 동작한다.
 */
export const RevealSection = forwardRef<HTMLDivElement, RevealProps>(function RevealSection(
  { children, ...props },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
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

/** RevealGroup 안에서 순서대로 fade+slide-up 되는 개별 항목. */
export function RevealItem(props: RevealProps) {
  return <motion.div variants={itemVariants} {...props} />;
}
