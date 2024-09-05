    const response = await fetch('/get-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promt_body: promt }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let receivedText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      receivedText += JSON.parse(decoder.decode(value, { stream: true })).response;

      console.log(receivedText)
      setData(receivedText);
    }
