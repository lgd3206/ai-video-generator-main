// Debug utility to test different models and parameters
// Run with: npx tsx scripts/debug-video-generation.ts

import { replicateService } from '../src/lib/ai-services'

async function debugVideoGeneration() {
  console.log('🔍 Debugging video generation...')

  const testPrompt = 'A cute orange cat playing with a red ball of yarn'

  try {
    console.log(`📝 Testing prompt: "${testPrompt}"`)

    // Start generation
    const result = await replicateService.createTextToVideo({
      prompt: testPrompt,
      duration: 3,
      fps: 8,
      width: 1024,
      height: 576,
    })

    console.log('✅ Generation started successfully!')
    console.log('📊 Response:', {
      id: result.id,
      status: result.status,
      urls: result.urls
    })

    if (result.id) {
      console.log('⏳ Monitoring generation progress...')

      // Poll for completion
      let attempts = 0
      const maxAttempts = 60 // 5 minutes max wait

      while (attempts < maxAttempts) {
        try {
          const status = await replicateService.getGeneration(result.id)
          console.log(`📈 Status check ${attempts + 1}: ${status.status}`)

          if (status.status === 'succeeded') {
            console.log('🎉 Generation completed successfully!')
            console.log('📹 Video URL:', status.output)
            break
          } else if (status.status === 'failed') {
            console.log('❌ Generation failed!')
            console.log('🐛 Error:', status.error)
            break
          }

          // Wait 5 seconds before next check
          await new Promise(resolve => setTimeout(resolve, 5000))
          attempts++

        } catch (pollError) {
          console.error('❌ Error checking status:', pollError)
          break
        }
      }

      if (attempts >= maxAttempts) {
        console.log('⏰ Generation timed out after 5 minutes')
      }
    }

  } catch (error) {
    console.error('💥 Debug test failed:', error)

    if (error instanceof Error) {
      console.error('📝 Error details:', {
        message: error.message,
        name: error.name
      })
    }
  }
}

// Run the debug test
if (require.main === module) {
  debugVideoGeneration()
    .then(() => {
      console.log('🏁 Debug completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Debug failed:', error)
      process.exit(1)
    })
}

export { debugVideoGeneration }