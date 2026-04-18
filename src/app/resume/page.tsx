import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'
import {
  highlightedProjects,
  resumeAwards,
  resumeSkills,
  volunteering,
  workExperience,
} from '@/lib/profile-content'
import { personSchemaId } from '@/lib/site'

export const metadata: Metadata = createPageMetadata({
  title: 'Resume',
  description: 'Resume and delivery history for William Blackie.',
  path: '/resume',
  noIndex: true,
})

export const dynamic = 'force-static'
export const revalidate = 0

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-ctp-text mt-8 text-xl font-semibold tracking-tight">
      {children}
    </h2>
  )
}

export default function Resume() {
  return (
    <>
      <JsonLd
        id="resume-page-schema"
        data={createPageSchema({
          title: 'Resume',
          description: metadata.description as string,
          path: '/resume',
          type: 'ProfilePage',
          mainEntity: {
            '@id': personSchemaId,
          },
        })}
      />
      <Container className="mt-16 sm:mt-32">
        <div className="max-w-3xl">
          <h1 className="text-ctp-text text-2xl font-bold tracking-tight sm:text-3xl">
            William Blackie | Full-stack Software Engineer
          </h1>
          <p className="text-ctp-subtext1 mt-1 text-sm">
            London and Bristol, UK (remote-friendly) | will@developerfy.com
          </p>

          <SectionTitle>About</SectionTitle>
          <p className="text-ctp-subtext1 mt-4 text-base">
            Full-stack engineer with experience across agency, consultancy, and
            product teams. I design and deliver reliable systems, improve
            delivery standards, and help teams keep shipping confidently. Past
            work includes delivery for Google, public-sector organisations, and
            major UK charities.
          </p>

          <SectionTitle>Skills / Technologies</SectionTitle>
          <ul className="text-ctp-subtext1 mt-4 list-inside list-disc space-y-2 text-base">
            {resumeSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>

          <SectionTitle>Highlighted Projects</SectionTitle>
          <div className="text-ctp-subtext1 mt-4 space-y-4 text-base">
            {highlightedProjects.map((project) => (
              <div key={project.name}>
                <strong>{project.name}</strong> – {project.role}
                <ul className="list-inside list-disc">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <SectionTitle>Experience</SectionTitle>
          <div className="text-ctp-subtext1 mt-4 space-y-4 text-base">
            {workExperience.map((role) => (
              <div key={role.key}>
                <strong>{role.company}</strong>
                {role.location ? `, ${role.location}` : ''} - {role.title}
                <span className="text-ctp-subtext1 block text-sm">
                  {role.startLabel} – {role.endLabel}
                </span>
                {role.bullets ? (
                  <ul className="mt-1 list-inside list-disc">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <SectionTitle>Education</SectionTitle>
          <div className="text-ctp-subtext1 mt-4 text-base">
            <strong>BSc (Hons) Computer Science</strong>, University of the West
            of England, Bristol
            <br />
            (September 2016 – May 2019, First-Class Honours)
          </div>

          <SectionTitle>Awards</SectionTitle>
          <ul className="text-ctp-subtext1 mt-4 list-inside list-disc space-y-2 text-base">
            {resumeAwards.map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>

          <SectionTitle>Volunteering</SectionTitle>
          <div className="text-ctp-subtext1 mt-4 text-base">
            <strong>{volunteering.role}</strong> ({volunteering.date})
            <ul className="list-inside list-disc">
              {volunteering.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
