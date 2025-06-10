import * as maa from '@maaxyz/maa-node/server'

async function main() {
  console.log('MaaFramework version:', maa.Global.version)

  maa.Global.config_init_option('.')

  maa.AgentServer.start_up(process.argv[process.argv.length - 1])

  maa.AgentServer.register_custom_recognizer('my_reco_222', async self => {
    let reco_detail = await self.context.run_recognition('MyCustomOCR', self.image, {
      MyCustomOCR: {
        roi: [100, 100, 200, 300]
      }
    })

    // context is a reference, will override the pipeline for whole task
    self.context.override_pipeline({
      MyCustomOCR: {
        roi: [1, 1, 114, 514]
      }
    })
    // context.run_recognition ...

    // make a new context to override the pipeline, only for itself
    const new_context = self.context.clone()
    new_context.override_pipeline({
      MyCustomOCR: {
        roi: [100, 200, 300, 400]
      }
    })
    reco_detail = await new_context.run_recognition('MyCustomOCR', self.image)

    const click_job = self.context.tasker.controller?.post_click(10, 20)
    await click_job?.wait()

    self.context.override_next(self.name, ['TaskA', 'TaskB'])

    return [
      {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      },
      'Hello World!'
    ]
  })

  maa.AgentServer.register_custom_action('my_action_111', self => {
    console.log('my_action_111 is running')
    return true
  })

  await maa.AgentServer.join()
  maa.AgentServer.shut_down()
}

main()
