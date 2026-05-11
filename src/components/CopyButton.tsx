'use client'

import { useEffect, useRef } from 'react'

const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`

const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>`

const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>`

const styles = {
  button: `
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.375rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.15s ease, background-color 0.15s ease, transform 0.1s ease;
    color: var(--ctp-subtext1, #a6adc8);
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
  `.trim(),
  tooltip: `
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
  `.trim(),
}

export function CodeBlockCopy({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const preElements = ref.current.querySelectorAll('pre')

    preElements.forEach((pre) => {
      if (pre.querySelector('button[data-copy]')) return

      pre.style.position = 'relative'

      const code = pre.querySelector('code')?.textContent || ''
      const button = document.createElement('button')
      button.setAttribute('data-copy', '')
      button.setAttribute('aria-label', 'Copy code to clipboard')
      button.setAttribute('type', 'button')
      button.style.cssText = styles.button

      const tooltip = document.createElement('span')
      tooltip.style.cssText = styles.tooltip
      tooltip.textContent = 'Copy'

      button.innerHTML = copyIcon
      button.appendChild(tooltip)

      const setButtonState = (
        state: 'default' | 'success' | 'error',
        message: string,
      ) => {
        const colors = {
          default: 'var(--ctp-subtext1, #a6adc8)',
          success: 'var(--ctp-green, #a6da95)',
          error: 'var(--ctp-red, #f38ba8)',
        }

        const icons = {
          default: copyIcon,
          success: checkIcon,
          error: errorIcon,
        }

        button.style.color = colors[state]
        button.innerHTML = icons[state]
        tooltip.textContent = message
        tooltip.style.color = colors[state]
        button.appendChild(tooltip)

        if (state !== 'default') {
          button.style.transform = 'scale(1.05)'
          setTimeout(() => {
            button.style.transform = 'scale(1)'
          }, 100)
        }
      }

      const copyToClipboard = async (text: string): Promise<boolean> => {
        try {
          await navigator.clipboard.writeText(text)
          return true
        } catch {
          const textarea = document.createElement('textarea')
          textarea.value = text
          textarea.style.position = 'fixed'
          textarea.style.opacity = '0'
          document.body.appendChild(textarea)
          textarea.select()
          try {
            document.execCommand('copy')
            return true
          } catch {
            return false
          } finally {
            document.body.removeChild(textarea)
          }
        }
      }

      button.addEventListener('click', async () => {
        const success = await copyToClipboard(code)
        if (success) {
          setButtonState('success', 'Copied!')
          setTimeout(() => setButtonState('default', 'Copy'), 2000)
        } else {
          setButtonState('error', 'Failed')
          setTimeout(() => setButtonState('default', 'Copy'), 2000)
        }
      })

      button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
      })
      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'transparent'
      })

      button.addEventListener('focus', () => {
        button.style.opacity = '1'
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
      })
      button.addEventListener('blur', () => {
        if (!pre.matches(':hover')) {
          button.style.opacity = '0'
        }
        button.style.backgroundColor = 'transparent'
      })

      pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1'
      })
      pre.addEventListener('mouseleave', () => {
        if (!button.matches(':focus')) {
          button.style.opacity = '0'
        }
      })

      pre.appendChild(button)
    })
  }, [children])

  return <div ref={ref}>{children}</div>
}
