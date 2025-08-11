import { existsSync, readFileSync, statSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const generateSchemaFile = () => {
  try {
    console.log('🔄 Generating schema.ts from template...')
    // Paths
    const schemaPath = resolve(process.cwd(), 'server/public/schema.graphql')
    const templatePath = resolve(process.cwd(), 'scripts/_template.md')
    const outputPath = resolve(process.cwd(), 'server/schema.ts')

    if (!existsSync(schemaPath)) {
      throw new Error(`Schema file not found: ${schemaPath}`)
    }
    const schemaContent = readFileSync(schemaPath, { encoding: 'utf-8' })
    console.log(`✓ Read schema from: ${schemaPath}`)

    // Read the template file
    let templateContent: string
    if (existsSync(templatePath)) {
      templateContent = readFileSync(templatePath, { encoding: 'utf-8' })
      console.log(`✓ Read template from: ${templatePath}`)
    } else {
      // return empty string if file doesn't exist
      templateContent = ''
      console.log('✓ Using empty string')
    }
    // Replace the placeholder with actual schema
    const generatedContent = templateContent.replace(
      '{{ schema }}',
      schemaContent,
    )

    // write the output file
    writeFileSync(outputPath, generatedContent, 'utf-8')
    console.log(`✅ Generated schema.ts at: ${outputPath}`)

    // Optional: Verify the generated file
    const stats = statSync(outputPath)
    console.log(`📄 File size: ${Math.round(stats.size / 1024)}KB`)
  } catch (error) {
    console.error('❌ Error generating schema file:', error.message)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSchemaFile()
}

export { generateSchemaFile }
