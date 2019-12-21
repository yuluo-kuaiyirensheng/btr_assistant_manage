export function messagePrompt(that, message, type, duration) {
  if(!duration) {
    duration = 3000;
  }
  that.$message({
    showClose: true,
    message,
    type,
    duration,
  })
}
