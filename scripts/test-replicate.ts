// Test script to verify Replicate API connection
// Run this with: npx tsx scripts/test-replicate.ts

// Load environment variables
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

import { replicateService } from '../src/lib/ai-services'

async function testReplicateAPI() {
  console.log('🧪 Testing Replicate API connection...')
  console.log('🔑 REPLICATE_API_TOKEN:', process.env.REPLICATE_API_TOKEN ? '✅ Found' : '❌ Not found')
  console.log('🔑 Token length:', process.env.REPLICATE_API_TOKEN?.length || 0)

  try {
    // Test text-to-video generation
    console.log('📝 Testing text-to-video generation...')
    console.log('🔍 Creating new ReplicateService instance...')

    // Create a fresh instance to ensure it picks up the environment variables
    const { ReplicateService } = await import('../src/lib/ai-services')
    const testService = new (ReplicateService as any)()

    const textToVideoResult = await testService.createTextToVideo({
      prompt: 'A cute orange cat playing with a colorful ball of yarn on a soft carpet, close-up view',
      duration: 2,
      fps: 8,
      width: 512,
      height: 320,
    })

    console.log('✅ Text-to-video request successful!')
    console.log('Generation ID:', textToVideoResult.id)
    console.log('Status:', textToVideoResult.status)

    // Monitor generation progress
    if (textToVideoResult.id) {
      console.log('⏳ Waiting for generation to complete...')
      const finalResult = await replicateService.waitForCompletion(textToVideoResult.id)
      console.log('🎉 Generation completed!')
      console.log('Final status:', finalResult.status)
      if (finalResult.output) {
        console.log('Video URL:', finalResult.output)
      }
    }

  } catch (error) {
    console.error('❌ API test failed:', error)

    if (error instanceof Error) {
      if (error.message.includes('Unauthorized')) {
        console.error('🔑 Please check your REPLICATE_API_TOKEN in .env.local')
      } else if (error.message.includes('not found')) {
        console.error('🔍 Model version might be incorrect or unavailable')
      }
    }
  }
}

// Run the test
if (require.main === module) {
  testReplicateAPI()
    .then(() => {
      console.log('✨ Test completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Test failed:', error)
      process.exit(1)
    })
}

export { testReplicateAPI }