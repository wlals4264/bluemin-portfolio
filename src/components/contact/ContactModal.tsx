'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { IoIosClose } from 'react-icons/io';
import { IoArrowForward } from 'react-icons/io5';

import GlassButton from '@/components/common/buttons/GlassButton';
import Icon3D from '@/components/common/media/Icon3D';
import { icon3dAssetsByKey } from '@/mocks/icon3dAssets';

import '@/styles/components/ContactModal.scss';

type InquiryType = '면접 제안' | '커피챗';
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const INQUIRY_TYPES: InquiryType[] = ['면접 제안', '커피챗'];

// About Me(myInfoData.tsx)에 이미 공개돼 있는 것과 같은 이메일 — 여기서 새로 노출하는
// 정보가 아니다.
const CONTACT_EMAIL = 'jimin2eezz@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/%EC%A7%80%EB%AF%BC-%EA%B9%80-9107b3408/';

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.9, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: 32,
    scale: 0.94,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const reducedPanelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * "SAY HELLO" Contact 모달 — production component.
 *
 * 폼 본문(카피·레이아웃)은 채용 담당자도 보는 화면이라 장난기를 넣지 않고 사용자가
 * 승인한 목업 그대로 깔끔하게 유지한다. 재미는 전송 성공 화면(이미 커밋한 방문자에게만
 * 보여주는 보너스)과, 이 모달을 여는 ContactLauncher의 hover 툴팁 두 곳에만 넣었다.
 *
 * 실제 메일 발송은 Web3Forms(https://web3forms.com)로 처리한다 — 백엔드 없이 access
 * key만으로 클라이언트에서 바로 POST할 수 있고, 그 key는 도메인 단위로만 유효해서
 * 공개돼도 안전하도록 설계돼 있다(Web3Forms 공식 가이드 기준). .env.local의
 * NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY에 발급받은 key를 넣어야 실제 전송이 동작한다.
 */
const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const shouldReduceMotion = useReducedMotion();
  const honeypotRef = useRef<HTMLInputElement>(null);

  // ContactLauncher가 isOpen=false인 상태로도 이 컴포넌트를 항상 마운트해두기 때문에
  // (재오픈 시 애니메이션 상태를 유지하려고), createPortal(..., document.body) 호출 자체가
  // 서버 렌더 단계에서도 실행돼 "document is not defined"로 500이 났다(ReadMe/ProjectScreens
  // 처럼 클릭 이후에만 마운트되는 모달과 달리 이건 처음부터 항상 트리에 있어서). 클라이언트
  // 마운트가 끝난 뒤에만 portal을 만들어 SSR에서는 아예 렌더하지 않는다.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [inquiryType, setInquiryType] = useState<InquiryType | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');

  // 배경 스크롤 잠금 — ReadMe 모달과 동일한 이유로 html/body 둘 다 잠근다.
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 닫았다가 다시 열면 이전 성공/실패 화면이 아니라 빈 폼부터 보여준다.
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 봇 트랩 — 사람 눈에는 안 보이는 필드라 스팸 봇만 흔히 채워 넣는다.
    if (honeypotRef.current?.value) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.warn(
        '[ContactModal] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY가 설정되지 않았어요 — .env.local에 Web3Forms access key를 추가해주세요.',
      );
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[포트폴리오 문의${inquiryType ? ` · ${inquiryType}` : ''}] ${name || '이름 미입력'}`,
          name,
          email,
          message,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `web3forms request failed (${res.status})`);
      }

      setStatus('success');
    } catch (error) {
      console.error('[ContactModal] web3forms submit failed', error);
      setStatus('error');
    }
  };

  if (!hasMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="contact-modal-wrapper"
          onClick={onClose}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          <motion.div
            className="contact-modal"
            onClick={(e) => e.stopPropagation()}
            variants={shouldReduceMotion ? reducedPanelVariants : panelVariants}
            style={{ transformPerspective: 1000 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title">
            <button type="button" className="contact-modal__close" onClick={onClose} aria-label="닫기">
              <IoIosClose />
            </button>

            <>
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className="contact-modal__success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}>
                  <Icon3D src={icon3dAssetsByKey.ship.src} alt="" size="hero" className="contact-modal__success-icon" />
                  <h2 className="contact-modal__title contact-modal__title--success">THANK YOU</h2>
                  <p className="contact-modal__subtitle">제안 주셔서 감사합니다.</p>
                  <p className="contact-modal__lead">
                    남겨주신 내용은 확인하는 대로 {email ? <strong>{email}</strong> : '남겨주신 메일'}로 빠르게 답장
                    드리겠습니다.
                  </p>
                  <GlassButton type="button" tone="neutral" onClick={onClose}>
                    닫기
                  </GlassButton>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 id="contact-modal-title" className="contact-modal__title">
                    CONTACT
                  </h2>
                  <p className="contact-modal__subtitle">너, 내 동료가 되어라!</p>
                  <p className="contact-modal__lead">
                    포트폴리오를 봐주셔서 감사해요. 궁금한 점이나 함께하고 싶은 이야기가 있다면, 아래로 바로 보내주세요.
                  </p>

                  <div className="contact-modal__chips" role="group" aria-label="문의 유형 선택(선택 사항)">
                    {INQUIRY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`contact-modal__chip ${inquiryType === type ? 'is-selected' : ''}`}
                        aria-pressed={inquiryType === type}
                        onClick={() => setInquiryType((prev) => (prev === type ? null : type))}>
                        {type}
                      </button>
                    ))}
                  </div>

                  <form className="contact-modal__form" onSubmit={handleSubmit}>
                    <input
                      ref={honeypotRef}
                      type="text"
                      name="botcheck"
                      className="contact-modal__honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="contact-modal__row">
                      <label className="contact-modal__field">
                        <span>이름 · 소속</span>
                        <input
                          type="text"
                          name="name"
                          placeholder="김지민 / OO컴퍼니"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </label>
                      <label className="contact-modal__field">
                        <span>회신받을 이메일</span>
                        <input
                          type="email"
                          name="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </label>
                    </div>

                    <label className="contact-modal__field">
                      <span>내용</span>
                      <textarea
                        name="message"
                        placeholder="편하게 연락주세요!"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </label>

                    {status === 'error' ? (
                      <p className="contact-modal__status contact-modal__status--error" role="alert">
                        전송에 실패했어요. 잠시 후 다시 시도하거나 아래 이메일로 바로 보내주세요.
                      </p>
                    ) : null}

                    <div className="contact-modal__actions">
                      <GlassButton
                        type="submit"
                        tone="accent"
                        className="contact-modal__submit"
                        disabled={status === 'submitting'}>
                        {status === 'submitting' ? '보내는 중…' : '메일 보내기'}
                        <IoArrowForward />
                      </GlassButton>
                      <GlassButton as="a" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                        <IoArrowForward />
                      </GlassButton>
                    </div>
                  </form>

                  <div className="contact-modal__footer">
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </div>
                </motion.div>
              )}
            </>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ContactModal;
