import { Button, FileInput, Flex, Stack } from "@mantine/core";
import { useState } from "react";

type SFileUploadProps = {
  importType: "player" | "drill";
};

export function SFileUpload({ importType }: SFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  async function uploadFile(_file: File) {
    let formData = new FormData();

    formData.set(`fileImport`, _file);

    try {
      const res = await fetch(`/api/${importType}/import`, {
        method: "POST",
        body: formData,
      });

      const jso = await res.json();
      console.log(jso);
      if (jso.success) {
        window.location.reload();
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <form
        action="."
        onSubmit={async (e) => {
          e.preventDefault();
          if (!file) return;
          await uploadFile(file);
        }}
      >
        <Stack spacing="md" align="center">
          <FileInput
            value={file}
            onChange={setFile}
            placeholder={`Import ${importType}s`}
          />
          <Button type="submit" variant="filled">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}
