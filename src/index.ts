import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as cache from '@actions/cache'

async function run() {
  try {
    const serviceId = core.getInput('service-id', { required: true })
    const accessToken = core.getInput('access-token', { required: true })

    const zcliPath = '/usr/local/bin/zcli'
    const zcliCacheKey = 'zcli-linux-amd64-cache'

    const cacheKey = await cache.restoreCache([zcliPath], zcliCacheKey)
    if (cacheKey) {
      core.info('Zerops CLI cache hit')
    } else {
      core.info('Zerops CLI cache miss')

      core.info('Installing Zerops CLI...')
      await exec.exec('curl', [
        '-L',
        'https://github.com/zeropsio/zcli/releases/latest/download/zcli-linux-amd64',
        '-o',
        zcliPath
      ])
      await exec.exec('chmod', ['+x', zcliPath])

      await cache.saveCache([zcliPath], zcliCacheKey)
    }

    core.exportVariable('ZEROPS_TOKEN', accessToken)

    core.info('Logging in with Zerops token...')
    await exec.exec(`zcli login ${accessToken}`)

    const deployCommand = `zcli push --serviceId ${serviceId}`
    core.info(`Executing: ${deployCommand}`)
    await exec.exec(deployCommand)

    core.info('Deployment completed successfully.')
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`Action failed with error: ${error.message}`)
    } else {
      core.setFailed('Action failed with an unknown error.')
    }
  }
}

run()
