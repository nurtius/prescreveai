import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso e condições do serviço",
}

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao acessar e usar este serviço, você aceita e concorda em estar vinculado aos termos e condições deste
                acordo. Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Uso do Serviço</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Você concorda em usar o serviço apenas para fins legais e de acordo com estes Termos de Uso. Você
                concorda em não usar o serviço:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>De qualquer forma que viole leis ou regulamentos aplicáveis</li>
                <li>Para transmitir material prejudicial, ofensivo ou inadequado</li>
                <li>Para interferir ou interromper o serviço ou servidores</li>
                <li>Para tentar obter acesso não autorizado ao serviço</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Privacidade</h2>
              <p className="text-gray-600 leading-relaxed">
                Sua privacidade é importante para nós. Nossa Política de Privacidade explica como coletamos, usamos e
                protegemos suas informações quando você usa nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Propriedade Intelectual</h2>
              <p className="text-gray-600 leading-relaxed">
                O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva
                da empresa e seus licenciadores. O serviço é protegido por direitos autorais, marcas registradas e
                outras leis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitação de Responsabilidade</h2>
              <p className="text-gray-600 leading-relaxed">
                Em nenhum caso a empresa será responsável por quaisquer danos indiretos, incidentais, especiais,
                consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou
                outras perdas intangíveis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Modificações dos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer
                momento. Se uma revisão for material, tentaremos fornecer pelo menos 30 dias de aviso antes de quaisquer
                novos termos entrarem em vigor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contato</h2>
              <p className="text-gray-600 leading-relaxed">
                Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através dos canais de
                comunicação disponíveis em nosso site.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
